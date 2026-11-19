import React from 'react';
import {tone} from '../../constants.js';

export default function Badge({status}){return <span className={'badge '+tone[status]}>{status}</span>}
