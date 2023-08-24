import React, { useState, useCallback } from 'react';
import { Button, CardBody, Heading, Text, Flex } from '@cardioswap/uikit';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import styled from 'styled-components'
import SaleInputPanel from 'components/SaleInputPanel';
import { CurrencyAmount, ETHER } from '@cardioswap/v2-sdk'; // Assuming that you have ETHER initialized properly
import ConnectWalletButton from 'components/ConnectWalletButton';
import { BottomGrouping, Wrapper } from 'components/swap/styleds';
import CardNav from 'components/CardNav';
import { RowBetween, RowFixed } from 'components/Row'
import { AutoColumn } from 'components/Column';
import Container from 'components/Container';
import { CARDIO } from 'constants/index';
import { useCurrencyBalance } from 'state/wallet/hooks';
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { HoverCard } from 'components/PositionCard';
import { useSaleHooks, useBuyTokens, useClaimTokens } from './saleContract';
import AppBody from '../AppBody';

const Sale: React.FC = () => {


  const StyledPageHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`
  const Details = styled.div`
  flex: 1;
`


  return (
    <Container>
      <CardNav />
      <AppBody>
        <Wrapper id="swap-page">
          <StyledPageHeader>
            <Flex alignItems="center">
              <Details>
                <Heading mb="8px">BUY CARDIO</Heading>
                <Text color="textSubtle" fontSize="14px">
                  CardioSwap (CARDIO) Token Sale
                </Text>
              </Details>
            </Flex>
            </StyledPageHeader>
            <StyledPageHeader>
            <HoverCard>
            <AutoColumn gap="md">
              <RowBetween>
                <RowFixed>
                  The CARDIO LBE has been cancelled and the PLS have been returned to the users.
                </RowFixed>
              </RowBetween>

            </AutoColumn>
          </HoverCard>
          </StyledPageHeader>
        </Wrapper>
      </AppBody>
    </Container>
  );
};

export default Sale;
