import * as actions from '../actions/cityActions';

import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import React, { Component } from 'react';
import {
    css,
    getRTL,
} from 'office-ui-fabric-react/lib/Utilities';

import { List } from 'office-ui-fabric-react/lib/List';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from './logo.svg';
import throttle from 'lodash/throttle';

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;

class CityPicker extends Component {
    _positions = {};
    _columnCount = 0;
    _columnWidth = 0;
    _rowHeight = 0;

    componentDidMount() {
    }

    onClick = (city) => {
        
    }

    render() {
        const { actions, feeds  } = this.props;
        return <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md3">
                    <TextField label="Explore mixcloud" placeholder="Explore mixcloud, enter search tags" onBeforeChange={this._onFilterChanged} />
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md3">
                    <FocusZone direction={FocusZoneDirection.vertical}>
                        <List
                            items={feeds}
                            getItemCountForPage={this._getItemCountForPage}
                            getPageHeight={this._getPageHeight}
                            renderedWindowsAhead={4}
                            onRenderCell={(item, index) => (
                                <div data-is-focusable={true} onCLick={()=>{ this.onClick(item.key) }}>
                                    <Image
                                        src={logo}
                                        width={105}
                                        height={20}
                                        imageFit={ImageFit.cover}
                                    />
                                    <div>
                                        <div className='ms-font-xl'>{item.name}</div>
                                        <div className='ms-font-s'>{item.key}</div>
                                    </div>
                                    <i className={css('ms-Icon', {
                                        'ms-Icon--chevronRight': !getRTL(),
                                        'ms-Icon--chevronLeft': getRTL()
                                    })} />
                                </div>
                            )} />
                    </FocusZone>
                </div>
            </div>
        </div>;
    }

    _onFilterChanged = (city) => {
        throttle(this.props.actions.fetchCityFeeds(city), 1000);
    }

    _getItemCountForPage = (itemIndex, surfaceRect) => {
        if (itemIndex === 0) {
            this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
            this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
            this._rowHeight = this._columnWidth;
        }

        return this._columnCount * ROWS_PER_PAGE;
    }

    _getPageHeight = (itemIndex, surfaceRect) => {
        return this._rowHeight * ROWS_PER_PAGE;
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        feeds: state.city.feeds
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CityPicker);