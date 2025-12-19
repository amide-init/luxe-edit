/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { EditorState, NodeKey } from 'lexical';
import type { Transaction as YTransaction } from 'yjs';
import { Text as YText, XmlElement, XmlText, YEvent } from 'yjs';
import { Binding, BindingV2, Provider } from '.';
import { SyncCursorPositionsFn } from './SyncCursors';
export declare function syncYjsChangesToLexical(binding: Binding, provider: Provider, events: Array<YEvent<YText>>, isFromUndoManger: boolean, syncCursorPositionsFn?: SyncCursorPositionsFn): void;
type IntentionallyMarkedAsDirtyElement = boolean;
export declare function syncLexicalUpdateToYjs(binding: Binding, provider: Provider, prevEditorState: EditorState, currEditorState: EditorState, dirtyElements: Map<NodeKey, IntentionallyMarkedAsDirtyElement>, dirtyLeaves: Set<NodeKey>, normalizedNodes: Set<NodeKey>, tags: Set<string>): void;
export declare function syncYjsChangesToLexicalV2__EXPERIMENTAL(binding: BindingV2, provider: Provider, events: Array<YEvent<XmlElement | XmlText>>, transaction: YTransaction, isFromUndoManger: boolean): void;
export declare function syncYjsStateToLexicalV2__EXPERIMENTAL(binding: BindingV2, provider: Provider): void;
export declare function syncLexicalUpdateToYjsV2__EXPERIMENTAL(binding: BindingV2, provider: Provider, prevEditorState: EditorState, currEditorState: EditorState, dirtyElements: Map<NodeKey, IntentionallyMarkedAsDirtyElement>, normalizedNodes: Set<NodeKey>, tags: Set<string>): void;
export {};
