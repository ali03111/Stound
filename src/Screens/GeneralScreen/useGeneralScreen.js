import {useState} from 'react';
import {errorMessage} from '../../Config/NotificationMessage';

const useGeneralScreen = ({navigate, goBack}, {params}) => {
  const [selectedValue, setSelectedValue] = useState(params.value || []);
  const selecteValue = tags => {
    if (selectedValue.includes(tags)) {
      const selected = selectedValue.filter(val => val.id !== tags.id);

      setSelectedValue(selected);
    } else {
      console.log('ueueueueu', selectedValue);

      setSelectedValue([...selectedValue, tags]);
    }
  };
  const onSave = () => {
    if (selectedValue.length == 0) errorMessage('Please select at least one!');
    params.onSelecteTag(selectedValue, params.key);
    goBack();
  };

  return {
    title: params.title,
    data: params.data || [],
    selecteValue,
    selectedValue,
    onSave,
  };
};

export default useGeneralScreen;
