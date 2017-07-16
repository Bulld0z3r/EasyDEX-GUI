import {
  triggerToaster,
  Config,
  dashboardCoinsState
} from '../actionCreators';
import {
  logGuiHttp,
  guiLogState
} from './log';

export function getDexCoins() {
  const _payload = {
    'userpass': `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
    'agent': 'InstantDEX',
    'method': 'allcoins',
  };

  return dispatch => {
    const _timestamp = Date.now();
    dispatch(logGuiHttp({
      'timestamp': _timestamp,
      'function': 'getDexCoins',
      'type': 'post',
      'url': Config.iguanaLessMode ? `http://127.0.0.1:${Config.agamaPort}/shepherd/InstantDEX/allcoins` : `http://127.0.0.1:${Config.iguanaCorePort}`,
      'payload': _payload,
      'status': 'pending',
    }));

    let _fetchConfig = {
      method: 'POST',
      body: JSON.stringify(_payload),
    };

    if (Config.iguanaLessMode) {
      _fetchConfig = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    return fetch(
      Config.iguanaLessMode ? `http://127.0.0.1:${Config.agamaPort}/shepherd/InstantDEX/allcoins` : `http://127.0.0.1:${Config.iguanaCorePort}`,
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
          'Error getDexCoins',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(logGuiHttp({
        'timestamp': _timestamp,
        'status': 'success',
        'response': json,
      }));
      dispatch(dashboardCoinsState(json));
    });
  }
}