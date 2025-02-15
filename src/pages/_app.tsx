import { providers } from 'ethers';
import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import XmtpProvider from 'components/XmtpProvider';
import RedirectProvider from 'components/RedirectProvider';
import { GlobalStyles, theme } from 'styles/global';
import {
  Provider as WagmiProvider,
  chain,
  createClient,
  defaultChains,
} from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { useEffect } from 'react';
import PlausibleProvider from 'next-plausible';

const alchemyKey = 'kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx';

const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
const wagmi = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const chain = chains.find((x) => x.id === chainId) ?? defaultChain;
    const rpcUrl = chain.rpcUrls.alchemy
      ? `${chain.rpcUrls.alchemy}/${alchemyKey}`
      : chain.rpcUrls.default;
    return [
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
          chainId: chain.id,
          jsonRpcUrl: rpcUrl,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
          rpc: { [chain.id]: rpcUrl },
        },
      }),
      new InjectedConnector({
        chains,
        options: { shimDisconnect: true },
      }),
    ];
  },
  provider(config) {
    return new providers.AlchemyProvider(config.chainId, alchemyKey);
  },
});

export default function App({ Component, pageProps }: AppProps) {
  // checking for notifications at the Top Level
  useEffect(() => {
    const CheckForNotification = async () => {
      if (!('Notification' in window)) {
        alert('This browser does not support desktop notification');
      } else {
        if (Notification.permission === 'default') {
          Notification.requestPermission()
            .then(function (p) {
              if (p === 'granted') {
                // case when user has granted permission, after clicking on the notification
              } else {
                //case when user has denied permission, after clicking on the notification
                console.log('User blocked notifications.');
              }
            })
            .catch(function (err) {
              console.error(err);
            });
        } else if (Notification.permission === 'granted') {
          // Case when notification is already granted
        } else {
          // Case when notification is denied
        }
        // request permission from user
      }
    };
    CheckForNotification();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <PlausibleProvider
        enabled={Boolean(process.env.NEXT_PUBLIC_ENABLE_PLAUSIBLE)}
        domain="daopanel.chat">
        <WagmiProvider client={wagmi}>
          <XmtpProvider>
            <RedirectProvider>
              <>
                <GlobalStyles />
                <Component {...pageProps} />
              </>
            </RedirectProvider>
          </XmtpProvider>
        </WagmiProvider>
      </PlausibleProvider>
    </ThemeProvider>
  );
}
