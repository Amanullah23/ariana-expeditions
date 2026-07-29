"use client";
import { useState, useCallback } from "react";

export default function useConfirm() {
  const [state, setState] = useState({
    open: false,
    resolve: null,
    options: {},
  });

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve) => {
      setState({ open: true, resolve, options });
    });
  }, []);

  function handleConfirm() {
    state.resolve(true);
    setState((s) => ({ ...s, open: false }));
  }

  function handleCancel() {
    state.resolve(false);
    setState((s) => ({ ...s, open: false }));
  }

  return {
    confirm,
    dialogProps: {
      open: state.open,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
      ...state.options,
    },
  };
}
