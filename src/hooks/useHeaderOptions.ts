import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';

const useHeaderOptions = ({options = {}} = {}) => {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions(options);
  }, [options, setOptions]);
};

export {useHeaderOptions};
