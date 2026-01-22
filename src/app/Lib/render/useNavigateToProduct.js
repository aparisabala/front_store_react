import { useNavigate } from 'react-router-dom';

export function useNavigateToProduct() {
  const navigate = useNavigate();
  const goToProduct = (item) => {
    if (!item?.id) return;
    navigate(`/app-details/${item.id}`);
  };
  return goToProduct;
}