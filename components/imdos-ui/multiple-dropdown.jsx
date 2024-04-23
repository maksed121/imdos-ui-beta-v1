import { Chip, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";

const MultipleDropdown = ({
  label,
  items,
  onChange,
  isInvalid,
  selectedKeys,
  errorMessage,
}) => {
  const [values, setValues] = React.useState(
    new Set(selectedKeys ? JSON.parse(selectedKeys) : [])
  );

  useEffect(() => {
    if (Array.from(values).length > 0) {
      onChange(JSON.stringify(Array.from(values)));
    }
  }, [values, onChange]);

  return (
    <Select
      label={label}
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      selectedKeys={values}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      placeholder={`Select ${label}`}
      onSelectionChange={setValues}
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item.textValue}</Chip>
            ))}
          </div>
        );
      }}
    >
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default MultipleDropdown;
