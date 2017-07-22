import React from 'react';
import {
  getCoinTitle,
  getModeInfo
} from '../../../util/coinHelper';
import CoinTileItem from './coinTileItem';

import CoinTileRender from './coinTile.render';

class CoinTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderTiles = this.renderTiles.bind(this);
  }

  renderTiles() {
    const modes = [
      'native',
      'basilisk',
      'full',
    ];
    const allCoins = this.props.Main;
    let items = [];

    if (allCoins &&
        allCoins.coins) {
      modes.map(function(mode) {
        allCoins.coins[mode].map(function(coin) {
          const _coinMode = getModeInfo(mode);
          const modecode = _coinMode.code;
          const modetip = _coinMode.tip;
          const modecolor = _coinMode.color;

          const _coinTitle = getCoinTitle(coin);
          const coinlogo = _coinTitle.logo;
          const coinname = _coinTitle.name;

          items.push({
            coinlogo,
            coinname,
            coin,
            mode,
            modecolor,
            modetip,
            modecode,
          });
        });
      });
    }

    return (
      items.map((item, i) =>
        <CoinTileItem
          key={ i }
          i={ i }
          item={ item }
          {...this.props} />)
    );
  }

  render() {
    return CoinTileRender.call(this);
  }
}

export default CoinTile;
