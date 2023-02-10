// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IBonusTracker {
    event Claim(address receiver, uint256 amount);
    event BoostingEffectUpdated(uint256 multiplier, uint256 expiry);

    struct BoosterInfo {
        uint256 multiplier;
        uint256 expiry;
    }

    struct BooleanStates {
        bool isInitialized;
        bool inPrivateTransferMode;
        bool inPrivateStakingMode;
        bool inPrivateClaimingMode;
        bool inExternalRewardingMode;
    }

    function depositBalances(address _account, address _depositToken) external view returns (uint256);

    function stakedAmounts(address _account) external view returns (uint256);

    function updateRewards() external;

    function stake(address _depositToken, uint256 _amount) external;

    function stakeForAccount(
        address _fundingAccount,
        address _account,
        address _depositToken,
        uint256 _amount
    ) external;

    function unstake(address _depositToken, uint256 _amount) external;

    function unstakeForAccount(address _account, address _depositToken, uint256 _amount, address _receiver) external;

    function tokensPerInterval() external view returns (uint256);

    function claim(address _receiver) external returns (uint256);

    function claimForAccount(address _account, address _receiver) external returns (uint256);

    function claimable(address _account) external view returns (uint256);

    function cumulativeRewards(address _account) external view returns (uint256);

    function updateBoostingInfo(address account, uint256 amount, uint256 expiry) external;
}