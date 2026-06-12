'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import styles from '../admin.module.css';
import { supabase } from '@/lib/supabaseClient';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, books(title)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
    } else {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  }

  async function handleStatusChange(orderId: string, newStatus: string) {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } else {
      alert('Gagal mengubah status: ' + error.message);
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Data Pesanan</h1>
      </div>

      <div className={styles.card}>
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Buku</th>
                  <th>Pembeli</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                      <td>{order.books?.title || 'Buku tidak ditemukan'}</td>
                      <td>
                        <strong>{order.customer_name}</strong><br />
                        <small>{order.customer_phone}</small>
                      </td>
                      <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.total_price)}</td>
                      <td>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          backgroundColor: order.status === 'completed' ? '#d1fae5' : order.status === 'pending' ? '#fef3c7' : '#fee2e2',
                          color: order.status === 'completed' ? '#065f46' : order.status === 'pending' ? '#92400e' : '#991b1b'
                        }}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <select 
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Diproses</option>
                          <option value="completed">Selesai</option>
                          <option value="cancelled">Dibatalkan</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                      Belum ada data pesanan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
