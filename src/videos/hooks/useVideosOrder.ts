import { useState } from 'react';
import qs from 'query-string';
import { Order, OrderBy } from '../../common/interfaces';
import { useHistory, useLocation } from 'react-router-dom';
import { useLatest, useUpdateEffect } from 'react-use';

interface UseVideosOrderReturn {
  order: Order;
  orderBy: OrderBy;
  onOrderChange: (orderBy: OrderBy) => void;
}

export const useVideosOrder = (defaultOrderBy: OrderBy = 'name', defaultOrder: Order = 'asc'): UseVideosOrderReturn => {
  // reading order & orderBy from location params
  const history = useHistory();
  const { search } = useLocation();
  const { order: searchOrder, orderBy: searchOrderBy } = qs.parse(search);
  const searchLatest = useLatest(search);

  const [orderBy, setOrderBy] = useState<OrderBy>((searchOrderBy as OrderBy) || defaultOrderBy);
  const [order, setOrder] = useState<Order>((searchOrder as Order) || defaultOrder);

  const onOrderChange = (by: OrderBy) => {
    if (by === orderBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(by);
      setOrder('asc');
    }
  };

  // updating location params
  useUpdateEffect(() => {
    const params = { ...qs.parse(searchLatest.current), order, orderBy };
    history.push({
      search: qs.stringify(params),
    });
  }, [order, orderBy]);

  return { order, orderBy, onOrderChange };
};
