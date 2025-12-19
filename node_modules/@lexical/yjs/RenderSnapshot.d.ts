/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { LexicalNode } from 'lexical';
import { ID, Snapshot } from 'yjs';
import { BindingV2 } from './Bindings';
export type YChange<UserT = any> = {
    id: ID;
    type: 'removed' | 'added';
    user: UserT | null;
};
export declare function $getYChangeState<UserT = unknown>(node: LexicalNode): YChange<UserT> | null;
/**
 * Replaces the editor content with a view that compares the state between two given snapshots.
 * Any added or removed nodes between the two snapshots will have {@link YChange} attached to them.
 *
 * @param binding Yjs binding
 * @param snapshot Ending snapshot state (default: current state of the Yjs document)
 * @param prevSnapshot Starting snapshot state (default: empty snapshot)
 */
export declare const renderSnapshot__EXPERIMENTAL: (binding: BindingV2, snapshot?: Snapshot, prevSnapshot?: Snapshot) => void;
