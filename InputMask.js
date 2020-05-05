import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const InputMask = props => {
  const { mask, value } = props;
  const [state, setState] = useState({
    defaultMask: mask,
    willUpdateMask: mask,
    value,
    oldValue: '',
  });

  const handleInput = event => {
    const { willUpdateMask, defaultMask } = state;
    const { onChange } = props;
    const key = event.target.value[event.target.value.length - 1];
    if (event.target.value.length < state.value.length) {
      if (defaultMask.includes(key)) {
        const valueLength = event.target.value.length - 2;
        const willReplace = defaultMask.substr(0, valueLength);
        const updatedMask = defaultMask.replace(willReplace, event.target.value.substr(0, valueLength));
        setState({
          ...state,
          value: event.target.value,
          willUpdateMask: updatedMask,
        });
      } else {
        const valueLength = event.target.value.length;
        const willReplace = defaultMask.substr(0, valueLength);
        const updatedMask = defaultMask.replace(willReplace, event.target.value);
        setState({
          ...state,
          value: event.target.value,
          willUpdateMask: updatedMask,
        });
      }
      return;
    }
    if (key) {
      if (willUpdateMask.includes('x') && event.target.value.length <= willUpdateMask.length) {
        const index = willUpdateMask.indexOf('x');
        const maskedValue = willUpdateMask.replace('x', key);
        const newValue = maskedValue.substr(0, index + 1);

        setState({
          ...state,
          willUpdateMask: maskedValue,
          value: newValue,
        });
        onChange(event);
      }
    }
  };

  useEffect(() => {
    if (props.value && !state.value) {
      setState({
        ...state,
        value: props.value,
      });
    }
  }, [props]);

  return (
    <input {...props} value={state.value} onChange={handleInput} />
  );
};

InputMask.propTypes = {
  mask: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

InputMask.defaultProps = {
  onChange: () => { },
  value: '',
};
