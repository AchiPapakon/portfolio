import { useDispatch as useDispatchJs, useSelector as useSelectorJs } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useDispatch = useDispatchJs.withTypes<AppDispatch>();
export const useSelector = useSelectorJs.withTypes<RootState>();
