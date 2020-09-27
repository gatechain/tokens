/**
 * SPDX-License-Identifier: MIT
 *
 * Copyright (c) 2018-2020 CENTRE SECZ
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

pragma solidity 0.6.12;

import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Ownable } from "../v1/Ownable.sol";
import { FiatTokenV2 } from "./FiatTokenV2.sol";
import { FiatTokenProxy } from "../v1/FiatTokenProxy.sol";
import { V2UpgraderHelper } from "./V2UpgraderHelper.sol";

/**
 * @title V2 Upgrader
 * @notice Performs USDC v2 upgrade, and runs a basic sanity test in a single
 * atomic transaction, rolling back if any issues are found. This may be
 * overkill, but the peace of mind is worth the gas spent. By performing the
 * upgrade atomically, it ensures that there is no disruption of service if the
 * upgrade is not successful for some unforeseen circumstances.
 * @dev Read docs/v2_upgrade.md
 */
contract V2Upgrader is Ownable {
    using SafeMath for uint256;

    FiatTokenProxy private _proxy;
    FiatTokenV2 private _implementation;
    address private _newProxyAdmin;
    address private _newOwner;
    V2UpgraderHelper private _helper;

    /**
     * @notice Constructor
     * @param proxy             FiatTokenProxy contract
     * @param implementation    FiatTokenV2 implementation contract
     * @param newProxyAdmin     Grantee of proxy admin role after upgrade
     * @param newOwner           New token owner
     */
    constructor(
        FiatTokenProxy proxy,
        FiatTokenV2 implementation,
        address newProxyAdmin,
        address newOwner
    ) public Ownable() {
        _proxy = proxy;
        _implementation = implementation;
        _newProxyAdmin = newProxyAdmin;
        _newOwner = newOwner;
        _helper = new V2UpgraderHelper(address(proxy));
    }

    /**
     * @notice The address of the FiatTokenProxy contract
     * @return Contract address
     */
    function proxy() external view returns (address) {
        return address(_proxy);
    }

    /**
     * @notice The address of the FiatTokenV2 implementation contract
     * @return Contract address
     */
    function implementation() external view returns (address) {
        return address(_implementation);
    }

    /**
     * @notice The address of the V2UpgraderHelper contract
     * @return Contract address
     */
    function helper() external view returns (address) {
        return address(_helper);
    }

    /**
     * @notice The address to which the proxy admin role will be transferred
     * after the upgrade is completed
     * @return Address
     */
    function newProxyAdmin() external view returns (address) {
        return _newProxyAdmin;
    }

    /**
     * @notice New ERC20 token name
     * @return New Name
     */
    function newOwner() external view returns (address) {
        return _newOwner;
    }

    /**
     * @notice Upgrade, transfer proxy admin role to a given address, run a
     * sanity test, and tear down the upgrader contract, in a single atomic
     * transaction. It rolls back if there is an error.
     */
    function upgrade() external onlyOwner {
        // The helper needs to be used to read contract state because
        // AdminUpgradeabilityProxy does not allow the proxy admin to make
        // proxy calls.

        // Keep original contract metadata
        string memory symbol = _helper.symbol();
        string memory name = _helper.name();
        uint8 decimals = _helper.decimals();
        string memory currency = _helper.currency();
        address masterMinter = _helper.masterMinter();
        address owner = _helper.fiatTokenOwner();
        address pauser = _helper.pauser();
        address blacklister = _helper.blacklister();

        // Change implementation contract address
        _proxy.upgradeTo(address(_implementation));

        // Transfer proxy admin role
        _proxy.changeAdmin(_newProxyAdmin);

        // Initialize V2 contract
        FiatTokenV2 v2 = FiatTokenV2(address(_proxy));
        v2.initializeV2(_newOwner);

        // Sanity test
        // Check metadata
        require(
            keccak256(bytes(name)) == keccak256(bytes(v2.name())) &&
            keccak256(bytes(symbol)) == keccak256(bytes(v2.symbol())) &&
            decimals == v2.decimals() &&
            keccak256(bytes(currency)) == keccak256(bytes(v2.currency())) &&
            masterMinter == v2.masterMinter() &&
            _newOwner == v2.owner() &&
            pauser == v2.pauser() &&
            blacklister == v2.blacklister(),
            "V2Upgrader: metadata test failed"
        );
        // Tear down
        _helper.tearDown();
        selfdestruct(msg.sender);
    }

    /**
     * @notice Transfer proxy admin role to newProxyAdmin, and self-destruct
     */
    function abortUpgrade() external onlyOwner {
        // Transfer proxy admin role
        _proxy.changeAdmin(_newProxyAdmin);

        // Tear down
        _helper.tearDown();
        selfdestruct(msg.sender);
    }
}
