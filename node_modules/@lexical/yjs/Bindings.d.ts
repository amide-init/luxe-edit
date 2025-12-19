/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { CollabDecoratorNode } from './CollabDecoratorNode';
import type { CollabElementNode } from './CollabElementNode';
import type { CollabLineBreakNode } from './CollabLineBreakNode';
import type { CollabTextNode } from './CollabTextNode';
import type { Cursor } from './SyncCursors';
import type { LexicalEditor, NodeKey } from 'lexical';
import { Klass, LexicalNode } from 'lexical';
import { Doc, XmlElement } from 'yjs';
import { Provider } from '.';
import { CollabV2Mapping } from './CollabV2Mapping';
export type ClientID = number;
export interface BaseBinding {
    clientID: number;
    cursors: Map<ClientID, Cursor>;
    cursorsContainer: null | HTMLElement;
    doc: Doc;
    docMap: Map<string, Doc>;
    editor: LexicalEditor;
    id: string;
    nodeProperties: Map<string, {
        [property: string]: unknown;
    }>;
    excludedProperties: ExcludedProperties;
}
export interface Binding extends BaseBinding {
    collabNodeMap: Map<NodeKey, CollabElementNode | CollabTextNode | CollabDecoratorNode | CollabLineBreakNode>;
    root: CollabElementNode;
}
export interface BindingV2 extends BaseBinding {
    mapping: CollabV2Mapping;
    root: XmlElement;
}
export type AnyBinding = Binding | BindingV2;
export type ExcludedProperties = Map<Klass<LexicalNode>, Set<string>>;
export declare function createBinding(editor: LexicalEditor, provider: Provider, id: string, doc: Doc | null | undefined, docMap: Map<string, Doc>, excludedProperties?: ExcludedProperties): Binding;
export declare function createBindingV2__EXPERIMENTAL(editor: LexicalEditor, id: string, doc: Doc | null | undefined, docMap: Map<string, Doc>, options?: {
    excludedProperties?: ExcludedProperties;
    rootName?: string;
}): BindingV2;
export declare function isBindingV1(binding: BaseBinding): binding is Binding;
export declare function isBindingV2(binding: BaseBinding): binding is BindingV2;
