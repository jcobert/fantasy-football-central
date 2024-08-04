import {
  FaArrowDown91,
  FaArrowDownShortWide,
  FaArrowDownZA,
  FaArrowUp19,
  FaArrowUpAZ,
  FaArrowUpShortWide,
} from 'react-icons/fa6'
import { Props as SelectProps } from 'react-select'

import { SelectOption } from '@/components/inputs/select-input'

export type SortDirection = 'ascending' | 'descending'

export type SortButtonMeta<T extends any = string> = {
  sortType: T
  label: string
  iconType: 'alpha' | 'numeric' | 'general'
}

export const sortIconMap: {
  [x in SortButtonMeta['iconType']]: {
    ascending: JSX.Element
    descending: JSX.Element
  }
} = {
  alpha: { ascending: <FaArrowUpAZ />, descending: <FaArrowDownZA /> },
  general: {
    ascending: <FaArrowUpShortWide />,
    descending: <FaArrowDownShortWide />,
  },
  numeric: { ascending: <FaArrowUp19 />, descending: <FaArrowDown91 /> },
}

export type FilterOption<T extends any = any> = {
  filterType: T
  label: string
  options: SelectOption<any>[]
  inputType: 'select' | 'checkbox' | 'radio'
  selectProps?: SelectProps
}

export type ActiveFilter<
  T extends any = any,
  U extends any = SelectOption,
> = Pick<FilterOption<T>, 'filterType'> & { value: U }

// export type ActiveFilters<T extends string = any> = {
//   [x in T]?: any;
// };
