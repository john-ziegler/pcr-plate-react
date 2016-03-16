/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 *
'use strict';

import React from 'react';
import {DragLayer} from 'react-dnd';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function collect (monitor) {
    var item = monitor.getItem();
    return {
        item: item,
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}

function getItemStyles (currentOffset) {
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    var x = currentOffset.x;
    var y = currentOffset.y;
    var transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform,
        zIndex: -9999,
    };
}

class SamplePreview extends React.Component {
    render () {
        if (!this.props.isDragging) {
            return null;
        }

        return (
            <div style={layerStyles}>
                <div className="item preview" style={getItemStyles(this.props.currentOffset)}>
                    {this.props.item}
                </div>
            </div>
        );
    }
}

SamplePreview.propTypes = {
    item: React.PropTypes.node,
    currentOffset: React.PropTypes.shape({
        x: React.PropTypes.number,
        y: React.PropTypes.number
    }),
    isDragging: React.PropTypes.bool
};

export default DragLayer(collect)(SamplePreview)*/