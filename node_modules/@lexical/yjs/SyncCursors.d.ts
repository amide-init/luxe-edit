/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { BaseSelection, NodeKey } from 'lexical';
import { Provider, UserState } from '.';
import { AnyBinding, type BaseBinding, type Binding } from './Bindings';
import { CollabDecoratorNode } from './CollabDecoratorNode';
import { CollabElementNode } from './CollabElementNode';
import { CollabLineBreakNode } from './CollabLineBreakNode';
import { CollabTextNode } from './CollabTextNode';
export type CursorSelection = {
    anchor: {
        key: NodeKey;
        offset: number;
    };
    caret: HTMLElement;
    color: string;
    focus: {
        key: NodeKey;
        offset: number;
    };
    name: HTMLSpanElement;
    selections: Array<HTMLElement>;
};
export type Cursor = {
    color: string;
    name: string;
    selection: null | CursorSelection;
};
type AnyCollabNode = CollabDecoratorNode | CollabElementNode | CollabTextNode | CollabLineBreakNode;
/**
 * @deprecated Use `$getAnchorAndFocusForUserState` instead.
 */
export declare function getAnchorAndFocusCollabNodesForUserState(binding: Binding, userState: UserState): {
    anchorCollabNode: AnyCollabNode | null;
    anchorOffset: number;
    focusCollabNode: AnyCollabNode | null;
    focusOffset: number;
};
export declare function $getAnchorAndFocusForUserState(binding: AnyBinding, userState: UserState): {
    anchorKey: NodeKey | null;
    anchorOffset: number;
    focusKey: NodeKey | null;
    focusOffset: number;
};
export declare function $syncLocalCursorPosition(binding: AnyBinding, provider: Provider): void;
export type SyncCursorPositionsFn = (binding: AnyBinding, provider: Provider, options?: SyncCursorPositionsOptions) => void;
export type SyncCursorPositionsOptions = {
    getAwarenessStates?: (binding: BaseBinding, provider: Provider) => Map<number, UserState>;
};
export declare function syncCursorPositions(binding: AnyBinding, provider: Provider, options?: SyncCursorPositionsOptions): void;
export declare function syncLexicalSelectionToYjs(binding: AnyBinding, provider: Provider, prevSelection: null | BaseSelection, nextSelection: null | BaseSelection): void;
export {};
