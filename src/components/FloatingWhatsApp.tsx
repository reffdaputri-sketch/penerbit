'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import styles from './FloatingWhatsApp.module.css';
import { supabase } from '@/lib/supabaseClient';

export default function FloatingWhatsApp() {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    async function fetchPhone() {
      const { data } = await supabase
        .from('company_profile')
        .select('phone')
        .limit(1)
        .single();
        
      if (data?.phone) {
        setPhoneNumber(data.phone);
      }
    }
    fetchPhone();
  }, []);

  if (!phoneNumber) return null;

  // Format the phone number
  // Remove non-numeric characters
  let formattedPhone = phoneNumber.replace(/\D/g, '');
  
  // If starts with 0, change to 62
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '62' + formattedPhone.substring(1);
  }

  // Fallback in case it's still missing country code but doesn't start with 0
  if (!formattedPhone.startsWith('62') && formattedPhone.length > 8) {
    // We assume it's Indonesian number if they entered 812xxxx without 0 or 62
    if (formattedPhone.startsWith('8')) {
      formattedPhone = '62' + formattedPhone;
    }
  }

  const waLink = `https://wa.me/${formattedPhone}?text=Halo%20Admin%20PenerbitWeb,%20saya%20ingin%20bertanya.`;

  return (
    <a 
      href={waLink} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.waButton}
      title="Hubungi Kami via WhatsApp"
    >
      <div className={styles.iconContainer}>
        <MessageCircle size={28} color="white" />
      </div>
      <span className={styles.tooltip}>Chat dengan kami!</span>
    </a>
  );
}
