import React from 'react';
import { Heading, Text, Flex } from '@cardioswap/uikit';
import styled from 'styled-components'
import { Wrapper } from 'components/swap/styleds';
import CardNav from 'components/CardNav';
import { RowBetween, RowFixed } from 'components/Row'
import { AutoColumn } from 'components/Column';
import Container from 'components/Container';
import { HoverCard } from 'components/PositionCard';
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
