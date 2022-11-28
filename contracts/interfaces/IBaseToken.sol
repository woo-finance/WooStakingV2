// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IBaseToken {
    function totalStaked() external view returns (uint256);

    function stakedBalance(address _account) external view returns (uint256);

    function toggleAdmin(address _account) external;

    function setInPrivateTransferMode(bool _inPrivateTransferMode) external;

    function withdrawToken(address _token, address _account, uint256 _amount) external;
}
