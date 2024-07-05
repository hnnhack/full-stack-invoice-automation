import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import logo from '../assets/images/logo.png'; 

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 30,
    flexDirection: 'col',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 100,
  },
  orderNumber: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  clientInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  clientAddress: {
    width: '50%',
  },
  companyInfo: {
    width: '50%',
    textAlign: 'right',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  totals: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalsItem: {
    width: '25%',
    textAlign: 'right',
    paddingRight: 20,
  },
  textBold: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Invoice = ({ order }) => {
  if (!order) return null;

  return (
    <PDFViewer width="100%" height="800">
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Image src={logo} style={styles.logo} />
            <Text style={styles.orderNumber}>Factuur: {order.orderId}</Text>
          </View>
          
          {/* Client and Company Info */}
          <View style={styles.clientInfo}>
            <View style={styles.clientAddress}>
              <Text>{order.billingDetails?.company}</Text>
              <Text>t.a.v. {order.billingDetails?.firstName} {order.billingDetails?.surname }</Text>
              <Text>{order.billingDetails?.streetName} {order.billingDetails?.houseNumber} {order.billingDetails?.houseNumberExtension}</Text>
              <Text>{order.billingDetails?.zipCode} {(order.billingDetails?.city).toUpperCase()}</Text>
              <Text>{order.billingDetails?.countryCode}</Text>
            </View>
            <View style={styles.companyInfo}>
              <Text>mijn_aap@gmail.com</Text>
              <Text>MijnApp</Text>
              <Text>9900AZ Groningen</Text>
              <Text>Nederland</Text>
            </View>
          </View>
          
          {/* Invoice Details */}
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCol}>Factuurnummer</Text>
              <Text style={styles.tableCol}>Factuurdatum</Text>
              <Text style={styles.tableCol}>Bestelnummer</Text>
              <Text style={styles.tableCol}>KVK Nummer</Text>
              <Text style={styles.tableCol}>BTW Nummer</Text>
              <Text style={styles.tableCol}>Besteldatum</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCol}>123456</Text>
              <Text style={styles.tableCol}>Today's Date</Text>
              <Text style={styles.tableCol}>{order.orderId}</Text>
              <Text style={styles.tableCol}>{order.billingDetails?.kvkNumber}</Text>
              <Text style={styles.tableCol}>{order.billingDetails?.vatNumber}</Text>
              <Text style={styles.tableCol}>{formatDate(order.orderPlacedDateTime)}</Text>
            </View>
          </View>
          
          {/* Order Items */}
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCol}>Omschrijving</Text>
              <Text style={styles.tableCol}>Aantal</Text>
              <Text style={styles.tableCol}>BTW %</Text>
              <Text style={styles.tableCol}>Prijs</Text>
              <Text style={styles.tableCol}>Subtotaal</Text>
            </View>
            {order.orderItems?.map( (item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCol}>{item.product.title}</Text>
                <Text style={styles.tableCol}>{item.quantity}</Text>
                <Text style={styles.tableCol}></Text>
                <Text style={styles.tableCol}>€{item.unitPrice}</Text>
                <Text style={styles.tableCol}>€{item.unitPrice}</Text>
              </View>
            ))}
          </View>
          
          {/* Totals */}
          <View style={styles.totals}>
            <View style={styles.totalsItem}>
              <Text>Totaal Excl. BTW: €{/* Price has to be calculated */}</Text> 
              <Text>BTW: €{/* Price has to be calculated */}</Text>
              <Text>Totaal Incl. BTW: €{/* Price has to be calculated */}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Invoice;
