import React, { Component, PropTypes } from 'react';
import Well from './Well';
import { ItemTypes } from '../Utils/Constants';
import { DropTarget } from 'react-dnd';
import {dispatch} from '../Dispatcher/PCRDispatcher';


const wellTarget = {
  drop(props, monitor) {
    var item = monitor.getItem();
    dispatch({type: 'sample/move', accession_number: item.id, location: [props.x, props.y]});
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),

  };
}


class PlateWell extends Component {
  handleClick() {
    dispatch({type: 'sample/open-sample-modal', xLoc: this.props.x, yLoc: this.props.y});
  }

  render() {
    const { x, y, connectDropTarget, isOver } = this.props;

    return connectDropTarget(
      <div onClick={this.handleClick.bind(this)}style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Well>
          {this.props.children}
        </Well>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    );
  }
}

PlateWell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.SAMPLE, wellTarget, collect)(PlateWell);