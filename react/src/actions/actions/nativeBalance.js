import { DASHBOARD_ACTIVE_COIN_NATIVE_BALANCE } from '../storeType';
import {
  triggerToaster,
  Config,
  getPassthruAgent,
  coindList
} from '../actionCreators';
import {
  logGuiHttp,
  guiLogState
} from './log';

export function getKMDBalanceTotal(coin) {
  let payload;

  if (coin !== 'KMD' &&
      coin !== 'ZEC') {
    payload = {
      'userpass': `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
      'agent': 'iguana',
      'method': 'passthru',
      'asset': coin,
      'function': 'z_gettotalbalance',
      'hex': '3000',
    };
  } else {
    payload = {
      'userpass': `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
      'agent': getPassthruAgent(coin),
      'method': 'passthru',
      'function': 'z_gettotalbalance',
      'hex': '3000',
    };
  }

  if (Config.cli.default) {
    payload = {
      mode: null,
      chain: coin,
      cmd: coindList[coin.toLowerCase()] ? 'getbalance' : 'z_gettotalbalance'
    };
  }

  return dispatch => {
    const _timestamp = Date.now();
    dispatch(logGuiHttp({
      'timestamp': _timestamp,
      'function': 'getKMDBalanceTotal',
      'type': 'post',
      'url': Config.cli.default ? `http://127.0.0.1:${Config.agamaPort}/shepherd/cli` : `http://127.0.0.1:${Config.iguanaCorePort}`,
      'payload': payload,
      'status': 'pending',
    }));

    let _fetchConfig = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    if (Config.cli.default) {
      _fetchConfig = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'payload': payload }),
      };
    }

    return fetch(
      Config.cli.default ? `http://127.0.0.1:${Config.agamaPort}/shepherd/cli` : `http://127.0.0.1:${Config.iguanaCorePort}`,
      _fetchConfig
    )
    .catch(function(error) {
      console.log(error);
      dispatch(logGuiHttp({
        'timestamp': _timestamp,
        'status': 'error',
        'response': error,
      }));
      dispatch(
        triggerToaster(
          'getKMDBalanceTotal',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(function(json) { // TODO: figure out why komodod spits out "parse error"
      dispatch(logGuiHttp({
        'timestamp': _timestamp,
        'status': 'success',
        'response': json,
      }));
      if (json &&
          !json.error) {
        dispatch(getNativeBalancesState(json, coin));
      }
    })
  }
}

export function getNativeBalancesState(json, coin) {
  if (coindList[coin.toLowerCase()]) {
    return {
      type: DASHBOARD_ACTIVE_COIN_NATIVE_BALANCE,
      balance: json && !json.error ? (Config.cli.default ? { 'transparent': json.result } : json) : 0,
    }
  } else {
    return {
      type: DASHBOARD_ACTIVE_COIN_NATIVE_BALANCE,
      balance: json && !json.error ? (Config.cli.default ? json.result : json) : 0,
    }
  }
}