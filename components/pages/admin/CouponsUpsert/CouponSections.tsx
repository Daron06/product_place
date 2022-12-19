import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { Checkbox } from 'components/Checkbox';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const sectionsName = ['menu', 'recipe', 'masterClass', 'chefStore', 'chefTable'];
const sectionsLabel = {
  menu: 'Menu',
  recipe: 'Recipe',
  masterClass: 'Masterclass',
  chefStore: 'Store',
  chefTable: 'Chef’s Table',
};

export const CouponSections: React.FC = () => {
  const { setValue, errors, watch } = useFormContext();
  const { sections } = watch();
  const [selectedSections, setSelectedSections] = React.useState(sections || []);
  const allSectionsSelected = selectedSections.length === sectionsName.length;

  const onClickCheckbox = async (name: string): Promise<void> => {
    setSelectedSections((prevState) => {
      if (!selectedSections.includes(name)) {
        return [...prevState, name];
      }
      return prevState.filter((s) => s !== name);
    });
  };

  React.useEffect(() => {
    setValue('sections', selectedSections, { shouldValidate: true });
  }, [selectedSections]);

  const handleClickCheckAll = async (): Promise<void> => {
    if (allSectionsSelected) {
      setSelectedSections([]);
    } else {
      setSelectedSections(sectionsName);
    }
  };

  return (
    <>
      <FormGroup>
        <div onClick={handleClickCheckAll}>
          <FormControlLabel
            style={{ pointerEvents: 'none' }}
            control={<Checkbox checked={allSectionsSelected} name="allSections" />}
            label="All checkbox"
          />
        </div>
        {sectionsName.map((name) => (
          <div key={name} className="cursor-p" onClick={(): Promise<void> => onClickCheckbox(name)}>
            <FormControlLabel
              style={{ pointerEvents: 'none' }}
              control={<Checkbox checked={selectedSections.includes(name)} name={name} value={name} />}
              label={sectionsLabel[name]}
            />
          </div>
        ))}
      </FormGroup>
      {errors?.sections?.message && <p style={{ color: 'red', marginBottom: 0 }}>{errors?.sections?.message}</p>}
    </>
  );
};
