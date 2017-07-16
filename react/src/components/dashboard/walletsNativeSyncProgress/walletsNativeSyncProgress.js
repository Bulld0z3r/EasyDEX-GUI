import React from 'react';
import { translate } from '../../../translate/translate';
import {
  ChainActivationNotificationRender,
  WalletsNativeSyncProgressRender
} from './walletsNativeSyncProgress.render';

class WalletsNativeSyncProgress extends React.Component {
  renderSyncPercentagePlaceholder() {
    if (this.props.Dashboard.progress &&
        this.props.Dashboard.progress.blocks > 0 &&
        this.props.Dashboard.progress.longestchain === 0) {
      return (
        <div className="progress-bar progress-bar-info progress-bar-striped active full-width font-size-80-percent">
          <span className="full-width">{ translate('INDEX.SYNC_ERR_LONGESTCHAIN') }</span>
        </div>
      );
    } else if (this.props.Dashboard.progress && this.props.Dashboard.progress.blocks === 0) {
      return (
        <div className="progress-bar progress-bar-info progress-bar-striped active full-width font-size-80-percent">
          <span className="full-width">{ translate('INDEX.SYNC_ERR_BLOCKS') }</span>
        </div>
      );
    } else {
      if (this.props.Dashboard.progress &&
          this.props.Dashboard.progress.blocks) {
        const syncPercentage = (parseFloat(parseInt(this.props.Dashboard.progress.blocks, 10) * 100 / parseInt(this.props.Dashboard.progress.longestchain, 10)).toFixed(2) + '%').replace('NaN', 0);

        return (
          <div
            className="progress-bar progress-bar-info progress-bar-striped active font-size-80-percent"
            style={{ width: syncPercentage }}>
            <span style={{ width: syncPercentage }}>{ syncPercentage }</span> | { this.props.Dashboard.progress.blocks } / { this.props.Dashboard.progress.longestchain } | { translate('INDEX.CONNECTIONS') }: { this.props.Dashboard.progress.connections }
          </div>
        );
      } else {
        return (
          <div
            className="progress-bar progress-bar-info progress-bar-striped active font-size-80-percent"
            style={{ width: '100%' }}>
            <span style={{ width: '100%' }}>{ translate('INDEX.LOADING_BLOCKS') }</span>
          </div>
        );
      }
    }
  }

  renderActivatingBestChainProgress() {
    if (this.props.Settings &&
        this.props.Settings.debugLog) {
      if (this.props.Settings.debugLog.indexOf('UpdateTip') > -1 &&
          !this.props.Dashboard.progress &&
          !this.props.Dashboard.progress.blocks) {
        const temp = this.props.Settings.debugLog.split(' ');
        let currentBestChain;
        let currentProgress;

        for (let i = 0; i < temp.length; i++) {
          if (temp[i].indexOf('height=') > -1) {
            currentBestChain = temp[i].replace('height=', '');
          }
          if (temp[i].indexOf('progress=') > -1) {
            currentProgress = Number(temp[i].replace('progress=', '')) * 100;
          }
        }

        // fallback to local data if remote node is inaccessible
        if (this.props.Dashboard.progress.remoteKMDNode &&
            !this.props.Dashboard.progress.remoteKMDNode.blocks) {
          return (
            `: ${currentProgress}% (activating)`
          );
        } else {
          if (this.props.Dashboard.progress.remoteKMDNode &&
              this.props.Dashboard.progress.remoteKMDNode.blocks) {
            return(
              `: ${Math.floor(currentBestChain * 100 / this.props.Dashboard.progress.remoteKMDNode.blocks)}% (${ translate('INDEX.BLOCKS_SM') } ${currentBestChain} / ${this.props.Dashboard.progress.remoteKMDNode.blocks})`
            );
          }
        }
      } else if (
          this.props.Settings.debugLog.indexOf('Still rescanning') > -1 &&
          !this.props.Dashboard.progress ||
          !this.props.Dashboard.progress.blocks
        ) {
        const temp = this.props.Settings.debugLog.split(' ');
        let currentProgress;

        for (let i = 0; i < temp.length; i++) {
          if (temp[i].indexOf('Progress=') > -1) {
            currentProgress = (Number(temp[i].replace('Progress=', '')) * 100).toFixed(2);
          }
        }

        return (
          `: ${currentProgress}% (${ translate('INDEX.RESCAN_SM') })`
        );
      } else if (
          this.props.Settings.debugLog.indexOf('LoadExternalBlockFile:') > -1 ||
          this.props.Settings.debugLog.indexOf('Reindexing block file') > -1 
        ) {
        return (
          `: (${ translate('INDEX.REINDEX') })`
        );
      } else {
        return (
          <span> ({ translate('INDEX.DL_BLOCKS') })</span>
        );
      }
    }
  }

  renderLB(_translationID) {
    const _translationComponents = translate(_translationID).split('<br>');

    return _translationComponents.map((_translation) =>
      <span>
        { _translation }
        <br />
      </span>
    );
  }

  renderChainActivationNotification() {
    return ChainActivationNotificationRender.call(this);

    /* if (this.props.Dashboard.progress) {
      if ((!this.props.Dashboard.progress.blocks && !this.props.Dashboard.progress.longestchain) ||
          (this.props.Dashboard.progress.blocks < this.props.Dashboard.progress.longestchain)) {
        return ChainActivationNotificationRender.call(this);
      }
    } else {
      return null;
    } */
  }

  render() {
    if (this.props &&
        this.props.Dashboard) {
      return WalletsNativeSyncProgressRender.call(this);
    }

    return null;
  }
}

export default WalletsNativeSyncProgress;
