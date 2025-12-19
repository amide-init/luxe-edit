/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { CodeHighlightNode } from './CodeHighlightNode';
import type { LineBreakNode, TabNode } from 'lexical';
export declare function $getFirstCodeNodeOfLine(anchor: CodeHighlightNode | TabNode | LineBreakNode): CodeHighlightNode | TabNode | LineBreakNode;
export declare function $getLastCodeNodeOfLine(anchor: CodeHighlightNode | TabNode | LineBreakNode): CodeHighlightNode | TabNode | LineBreakNode;
/**
 * Determines the visual writing direction of a code line.
 *
 * Scans the line segments (CodeHighlightNode/TabNode) from start to end
 * and returns the first strong direction found ("ltr" or "rtl").
 * If no strong character is found, falls back to the parent element's
 * direction. Returns null if indeterminate.
 */
export declare function $getCodeLineDirection(anchor: CodeHighlightNode | TabNode | LineBreakNode): 'ltr' | 'rtl' | null;
export declare function $getStartOfCodeInLine(anchor: CodeHighlightNode | TabNode, offset: number): null | {
    node: CodeHighlightNode | TabNode | LineBreakNode;
    offset: number;
};
export declare function $getEndOfCodeInLine(anchor: CodeHighlightNode | TabNode): CodeHighlightNode | TabNode;
