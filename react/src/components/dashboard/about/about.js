import React from "react";

class About extends React.Component {
  render() {
    return (
      <div className="page margin-left-0">
        <div className="page-content">
          <h2>About Agama</h2>
          <p>Agama Wallet is a desktop app that you can use to manage multiple cryptocurrency wallets. When you set up a
            wallet, you can configure it to operate in one of the following modes:

            <ul>
              <li>
                <span className="font-weight-600">Basilisk Mode</span>: Doesn't download the blockchain. Slightly slower
                transaction performance.
              </li>
              <li>
                <span className="font-weight-600">Full Mode</span>: Downloads the full blockchain, which can take a
                while. Good transaction performance.
              </li>
              <li>
                <span className="font-weight-600">Native Mode</span>: Only available for a few currencies. Like 'Full
                Mode' but provides advanced functionality.
              </li>
            </ul>
            Agama includes the following capabilities:

            <ul>
              <li>
                <span className="font-weight-600">InstantDEX</span>: Easily exchange cryptocurrencies via a
                shapeshift-like service.
                <a href="https://supernet.org/en/technology/whitepapers/easydex-a-practical-native-dex" target="_blank">
                  (EasyDEX – A Practical Native DEX)
                </a>
              </li>
              <li>
                <span className="font-weight-600">Atomic Exporer</span>: A universal local explorer ensures you don't
                have query information from a centralized
                server.
              </li>
            </ul>

            <span className="font-weight-600">
              Note: Agama Wallet is still in development. It is safe to use,
              but you should make proper backups. We do not recommend using it as the primarily wallet for your cryptocurrencies.
            </span>

            <br/>

            <span className="font-weight-600">Testers</span>:
            You can help us test Agama. Just <a target="_blank" href="https://supernet.org/en/products/agama-wallet">download and install the latest release</a>.
            Then, report any bugs you encounter to our developers on the #testing-agama Slack channel.
            Your help is greatly appreciated!

            Agama also supports the following desktop apps:
            <ul>
              <li>
                <span className="font-weight-600">Jumblr</span>: A decentralized Bitcoin blockchain tumbler for privacy
                and lower fees.
              </li>
              <li>
                <span className="font-weight-600">NativeDEX</span>
              </li>
            </ul>
          </p>
        </div>
      </div>
    );
  }
}

export default About;