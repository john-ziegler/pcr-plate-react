'use strict';

import type {Action} from './PCRActions';

import {Dispatcher} from 'flux';

const instance: Dispatcher<Action> = new Dispatcher();
export default instance;

export const dispatch = instance.dispatch.bind(instance);