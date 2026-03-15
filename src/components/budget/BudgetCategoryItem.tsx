import React from 'react';
import { Pencil, X } from 'lucide-react';

interface BudgetItem {
  id: string;
  category: string;
  name: string;
  priceType?: 'FIX_EVENT' | 'PER_INVITAT';
  unitPrice?: number;
  quantity?: number;
  estimatedPrice: number;
  realPrice: number;
  paymentStatus: 'paid' | 'deposit' | 'unpaid';
  supplierId?: string;
}

interface BudgetCategoryItemProps {
  item: BudgetItem;
  isEditing: boolean;
  editValues: {
    priceType?: 'FIX_EVENT' | 'PER_INVITAT';
    unitPrice?: number;
    quantity?: number;
    estimatedPrice: number;
    realPrice: number;
    paymentStatus: 'paid' | 'deposit' | 'unpaid';
  };
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  onEditValuesChange: (values: { priceType?: 'FIX_EVENT' | 'PER_INVITAT'; unitPrice?: number; quantity?: number; estimatedPrice: number; realPrice: number; paymentStatus: 'paid' | 'deposit' | 'unpaid' }) => void;
  getPaymentStatusColor: (status: string) => string;
  getPaymentStatusText: (status: string) => string;
}

export function BudgetCategoryItem({
  item,
  isEditing,
  editValues,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onEditValuesChange,
  getPaymentStatusColor,
  getPaymentStatusText,
}: BudgetCategoryItemProps) {
  // Helper function to automatically calculate payment status
  const calculatePaymentStatus = (realPrice: number, estimatedPrice: number): 'unpaid' | 'deposit' | 'paid' => {
    if (realPrice === 0) return 'unpaid';
    if (realPrice >= estimatedPrice) return 'paid';
    return 'deposit';
  };

  if (isEditing) {
    return (
      <div className="bg-white border-2 border-[#e5e7eb] px-[30px] py-[18px] hover:border-[#d1d5dc] transition-all">
        <div className="space-y-3 flex-1">
          <input
            type="text"
            value={item.name}
            disabled
            className="w-full px-4 py-2 text-[14px] border border-[#e5e7eb] rounded-full bg-[#f3f4f6] text-[#6a7282]"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] text-[#6a7282] mb-1">
                {item.priceType === 'PER_INVITAT' ? 'Preț per invitat' : 'Preț estimat'}
              </label>
              <input
                type="number"
                value={item.priceType === 'PER_INVITAT' ? (editValues.unitPrice ?? 0) : editValues.estimatedPrice}
                onChange={(e) => {
                  const rawValue = parseFloat(e.target.value) || 0;
                  const newEstimated = item.priceType === 'PER_INVITAT'
                    ? rawValue * (editValues.quantity || item.quantity || 1)
                    : rawValue;
                  const newStatus = calculatePaymentStatus(editValues.realPrice, newEstimated);
                  onEditValuesChange({
                    ...editValues,
                    unitPrice: item.priceType === 'PER_INVITAT' ? rawValue : editValues.unitPrice,
                    estimatedPrice: newEstimated,
                    paymentStatus: newStatus,
                  });
                }}
                className="w-full px-4 py-2 text-[14px] border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#6a7282] mb-1">Achitat</label>
              <input
                type="number"
                value={editValues.realPrice}
                onChange={(e) => {
                  const newReal = parseFloat(e.target.value) || 0;
                  const newStatus = calculatePaymentStatus(newReal, editValues.estimatedPrice);
                  onEditValuesChange({ ...editValues, realPrice: newReal, paymentStatus: newStatus });
                }}
                className="w-full px-4 py-2 text-[14px] border border-[#e5e7eb] rounded-full focus:border-[#960010] focus:outline-none"
              />
            </div>
          </div>
          {item.priceType === 'PER_INVITAT' && (
            <div className="w-full px-4 py-2 text-[14px] border border-[#e5e7eb] rounded-full bg-[#f9fafb] text-[#6a7282]">
              {(editValues.unitPrice ?? item.unitPrice ?? 0).toLocaleString()} MDL × {(editValues.quantity ?? item.quantity ?? 1).toLocaleString()} invitați = {(editValues.estimatedPrice || 0).toLocaleString()} MDL
            </div>
          )}
          <div className="w-full px-4 py-2 text-[14px] border border-[#e5e7eb] rounded-full bg-[#f9fafb] flex items-center">
            <span className="text-[12px] text-[#6a7282] mr-2">Status:</span>
            <span className={`text-[10px] px-3 py-1 rounded-full uppercase font-semibold ${getPaymentStatusColor(editValues.paymentStatus)}`}>
              {getPaymentStatusText(editValues.paymentStatus)}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSaveEdit}
              className="flex-1 text-[14px] px-4 py-2 bg-[#101828] hover:bg-[#374151] text-white rounded-full transition-all"
            >
              Salvează
            </button>
            <button
              onClick={onCancelEdit}
              className="flex-1 text-[14px] px-4 py-2 bg-white hover:bg-[#f3f4f6] text-[#364153] border border-[#e5e7eb] rounded-full transition-all"
            >
              Anulează
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-[#e5e7eb] px-[30px] py-[18px] hover:border-[#d1d5dc] transition-all flex items-center gap-[16px]">
      {/* Checkbox circular */}
      <div className="w-[24px] h-[24px] rounded-full border-2 border-[#d1d5dc] flex-shrink-0" />
      
      {/* Nume + Detalii */}
      <div className="flex-1 flex flex-col gap-[8px]">
        <h4 className="font-medium text-[16px] leading-[24px] text-[#101828] tracking-[-0.625px] uppercase">{item.name}</h4>
        <div className="flex items-center gap-[12px] text-[12px] leading-[18px] text-[#6a7282]">
          <span>
            {item.priceType === 'PER_INVITAT'
              ? `${(item.unitPrice || 0).toLocaleString()} MDL × ${(item.quantity || 1).toLocaleString()} invitați`
              : 'Preț fix eveniment'}
          </span>
          <span>•</span>
          <span>Estimat: {item.estimatedPrice.toLocaleString()} MDL</span>
          <span>•</span>
          <span>Achitat: {item.realPrice.toLocaleString()} MDL</span>
        </div>
      </div>
      
      {/* Badge status */}
      <span className={`text-[10px] px-[8px] py-[2.5px] h-[19px] rounded-full uppercase font-semibold ${getPaymentStatusColor(item.paymentStatus)} flex items-center justify-center whitespace-nowrap`}>
        {getPaymentStatusText(item.paymentStatus)}
      </span>
      
      {/* Butoane acțiuni */}
      <div className="flex gap-[8px]">
        <button
          onClick={onStartEdit}
          className="w-[32px] h-[32px] text-[#99A1AF] hover:text-[#101828] hover:bg-[#f3f4f6] rounded-[16px] transition-all flex items-center justify-center"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="w-[32px] h-[32px] text-[#99A1AF] hover:text-[#960010] hover:bg-[#f3f4f6] rounded-[16px] transition-all flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
