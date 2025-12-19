/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const mod = await (process.env.NODE_ENV !== 'production' ? import('./LexicalYjs.dev.mjs') : import('./LexicalYjs.prod.mjs'));
export const $getYChangeState = mod.$getYChangeState;
export const CLEAR_DIFF_VERSIONS_COMMAND__EXPERIMENTAL = mod.CLEAR_DIFF_VERSIONS_COMMAND__EXPERIMENTAL;
export const CONNECTED_COMMAND = mod.CONNECTED_COMMAND;
export const DIFF_VERSIONS_COMMAND__EXPERIMENTAL = mod.DIFF_VERSIONS_COMMAND__EXPERIMENTAL;
export const TOGGLE_CONNECT_COMMAND = mod.TOGGLE_CONNECT_COMMAND;
export const createBinding = mod.createBinding;
export const createBindingV2__EXPERIMENTAL = mod.createBindingV2__EXPERIMENTAL;
export const createUndoManager = mod.createUndoManager;
export const getAnchorAndFocusCollabNodesForUserState = mod.getAnchorAndFocusCollabNodesForUserState;
export const initLocalState = mod.initLocalState;
export const renderSnapshot__EXPERIMENTAL = mod.renderSnapshot__EXPERIMENTAL;
export const setLocalStateFocus = mod.setLocalStateFocus;
export const syncCursorPositions = mod.syncCursorPositions;
export const syncLexicalUpdateToYjs = mod.syncLexicalUpdateToYjs;
export const syncLexicalUpdateToYjsV2__EXPERIMENTAL = mod.syncLexicalUpdateToYjsV2__EXPERIMENTAL;
export const syncYjsChangesToLexical = mod.syncYjsChangesToLexical;
export const syncYjsChangesToLexicalV2__EXPERIMENTAL = mod.syncYjsChangesToLexicalV2__EXPERIMENTAL;
export const syncYjsStateToLexicalV2__EXPERIMENTAL = mod.syncYjsStateToLexicalV2__EXPERIMENTAL;