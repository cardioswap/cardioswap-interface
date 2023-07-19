import { Currency, ETHER, Token } from '@cardioswap/v2-sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'PLS'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
