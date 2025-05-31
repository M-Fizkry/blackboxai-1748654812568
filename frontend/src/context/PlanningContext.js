import React, { createContext, useContext, useState } from 'react';

const PlanningContext = createContext();

export function PlanningProvider({ children }) {
  const [planningData, setPlanningData] = useState({
    '9110': {
      title: 'Plan 1 - 9110',
      description: 'Production planning for series 9110',
      data: [
        {
          id: 1,
          planDate: '2024-02-20',
          numberMO: 'MO001',
          itemNumber: 'ITM001',
          itemName: 'Engine Part A',
          planningQty: 100,
          actualProd: 0
        },
        {
          id: 2,
          planDate: '2024-02-21',
          numberMO: 'MO002',
          itemNumber: 'ITM002',
          itemName: 'Circuit Board B',
          planningQty: 150,
          actualProd: 0
        }
      ]
    },
    '9210': {
      title: 'Plan 2 - 9210',
      description: 'Production planning for series 9210',
      data: []
    },
    '9220': {
      title: 'Plan 2 - 9220',
      description: 'Production planning for series 9220',
      data: []
    },
    '9230': {
      title: 'Plan 2 - 9230',
      description: 'Production planning for series 9230',
      data: []
    },
    '9310': {
      title: 'Plan 3 - 9310',
      description: 'Production planning for series 9310',
      data: []
    }
  });

  const updateProductionResult = (moNumber, quantity) => {
    setPlanningData(prev => {
      const newData = { ...prev };
      
      // Search through all plans for the MO number
      Object.keys(newData).forEach(planId => {
        newData[planId].data = newData[planId].data.map(item => {
          if (item.numberMO === moNumber) {
            return {
              ...item,
              actualProd: (item.actualProd || 0) + Number(quantity)
            };
          }
          return item;
        });
      });
      
      return newData;
    });
  };

  return (
    <PlanningContext.Provider value={{ planningData, setPlanningData, updateProductionResult }}>
      {children}
    </PlanningContext.Provider>
  );
}

export function usePlanning() {
  const context = useContext(PlanningContext);
  if (!context) {
    throw new Error('usePlanning must be used within a PlanningProvider');
  }
  return context;
}
