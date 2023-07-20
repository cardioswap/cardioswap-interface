import React, { useState, useCallback } from 'react';
import { Button, CardBody } from '@cardioswap/uikit';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import SaleInputPanel from 'components/SaleInputPanel';
import { CurrencyAmount, ETHER } from '@cardioswap/v2-sdk'; // Assuming that you have ETHER initialized properly
import ConnectWalletButton from 'components/ConnectWalletButton';
import PageHeader from 'components/PageHeader';
import { BottomGrouping, Wrapper } from 'components/swap/styleds';
import CardNav from 'components/CardNav';
import { AutoColumn } from 'components/Column';
import Container from 'components/Container';
import { CARDIO } from 'constants/index';
import { useCurrencyBalance } from 'state/wallet/hooks';
import { maxAmountSpend } from 'utils/maxAmountSpend'
import AppBody from '../AppBody';

const Sale: React.FC = () => {
  const { account, library } = useWeb3React<ethers.providers.Web3Provider>();
  const [ethAmount, setEthAmount] = useState<string>('');
  const [cardioAmount, setCardioAmount] = useState<string>('');

  const remainingForSale = 1000000;



  const plsBalance = useCurrencyBalance(account ?? undefined, ETHER);
  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(plsBalance);
  const atMaxAmountInput = Boolean(maxAmountInput && ethAmount === maxAmountInput.toExact());

  const isPlsBalanceZero = plsBalance?.toExact() === '0';
  const isCardioAmountExceeding = Number(cardioAmount) > Number(remainingForSale);

  const handleEthAmountChange = useCallback((value: string) => {
    setEthAmount(value);
    const cardioValue = (Number(value) / 100).toString(); // Multiply the input value by 100
    setCardioAmount(cardioValue);
  }, []);

  const handleCardioAmountChange = useCallback((value: string) => {
    setCardioAmount(value);
    const ethValue = (Number(value) * 100).toString(); // Divide the input value by 100
    setEthAmount(ethValue);
  }, []);


  const calculateMaxAmount = useCallback(async () => {
    if (!library || !account) return;

    const balance = await library.getBalance(account);
    const ethBalance = ethers.utils.formatEther(balance);
    setEthAmount(ethBalance);

    // Calculate cardioAmount based on the max ETH amount
    const cardioValue = (Number(ethBalance) / 100).toString();
    setCardioAmount(cardioValue);
  }, [library, account]);

  const buyTokens = () => {
    // Here  implement the buy logic
  };

  return (
    <Container>
      <CardNav />
      <AppBody>
        <Wrapper id="swap-page">
          <PageHeader title="Exchange" description="Trade tokens in an instant" />
          <CardBody>
            <AutoColumn gap="md">
              <SaleInputPanel
                label="From (ETH)"
                value={ethAmount}
                onUserInput={handleEthAmountChange}
                onMax={calculateMaxAmount}
                showMaxButton={!atMaxAmountInput}
                currency={ETHER} // assuming ETHER is correctly initialized
                id="eth-input"
              />
              <SaleInputPanel
                label="To (Cardio)"
                value={cardioAmount}
                onUserInput={handleCardioAmountChange}
                showMaxButton={false}
                currency={CARDIO}
                id="cardio-output"
              />
            </AutoColumn>
            <BottomGrouping>
              {!account ? (
                <ConnectWalletButton width="100%" />
              ) : isPlsBalanceZero ? (
                <Button
                  disabled
                  variant="primary"
                  width="100%"
                >
                  Not enough PLS balance
                </Button>
              ) : isCardioAmountExceeding ? (
                <Button disabled
                  variant="primary"
                  width="100%">
                  Not enough CARDIO available
                </Button>
              ) : (
                <Button
                  onClick={buyTokens}
                  disabled={isPlsBalanceZero}
                  variant="primary"
                  width="100%"
                >
                  Swap
                </Button>
              )}
            </BottomGrouping>

          </CardBody>
        </Wrapper>
      </AppBody>
    </Container>
  );
};

export default Sale;
