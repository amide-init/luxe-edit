/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { type LexicalNode, NodeKey, type TextNode } from 'lexical';
import { XmlElement, XmlText } from 'yjs';
type SharedType = XmlElement | XmlText;
export declare class CollabV2Mapping {
    private _nodeMap;
    private _sharedTypeToNodeKeys;
    private _nodeKeyToSharedType;
    set(sharedType: SharedType, node: LexicalNode | TextNode[]): void;
    get(sharedType: XmlElement): LexicalNode | undefined;
    get(sharedType: XmlText): TextNode[] | undefined;
    get(sharedType: SharedType): LexicalNode | Array<TextNode> | undefined;
    getSharedType(node: LexicalNode): SharedType | undefined;
    delete(sharedType: SharedType): void;
    deleteNode(nodeKey: NodeKey): void;
    has(sharedType: SharedType): boolean;
    clear(): void;
}
export {};
