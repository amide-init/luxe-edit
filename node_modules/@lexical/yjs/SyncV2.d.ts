/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { LexicalNode, NodeKey } from 'lexical';
import { Doc as YDoc, ID, Snapshot, XmlElement } from 'yjs';
import { BindingV2 } from './Bindings';
type ComputeYChange = (event: 'removed' | 'added', id: ID) => Record<string, unknown>;
export declare const $createOrUpdateNodeFromYElement: (el: XmlElement, binding: BindingV2, keysChanged: Set<string> | null, childListChanged: boolean, snapshot?: Snapshot, prevSnapshot?: Snapshot, computeYChange?: ComputeYChange) => LexicalNode | null;
export declare const $updateYFragment: (y: YDoc, yDomFragment: XmlElement, node: LexicalNode, binding: BindingV2, dirtyElements: Set<NodeKey>) => void;
export {};
