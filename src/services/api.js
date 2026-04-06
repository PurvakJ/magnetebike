import axios from "axios";

// Replace with your actual Google Apps Script URL
const API = "https://script.google.com/macros/s/AKfycbzjrvlnsxuseSHsCQy4FDJ8FDSKzGIAdzrYTRM1Rof32uKP0iCu_FF75iY_maTNZMS8VQ/exec";

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'text/plain', // Changed to text/plain for Google Apps Script
  }
});

export const getProducts = async () => {
  try {
    const response = await apiClient.get(`${API}?type=products`);
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getReviews = async () => {
  try {
    const response = await apiClient.get(`${API}?type=reviews`);
    return response;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const bookAppointment = async (data) => {
  try {
    const response = await apiClient.post(API, JSON.stringify({ ...data, type: "appointment" }));
    return response;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};

export const addReview = async (data) => {
  try {
    const response = await apiClient.post(API, JSON.stringify({ ...data, type: "review" }));
    return response;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

export const addProduct = async (data) => {
  try {
    console.log('Sending product data:', data); // Debug log
    const response = await apiClient.post(API, JSON.stringify({ ...data, type: "addProduct" }));
    console.log('Product added response:', response.data); // Debug log
    return response;
  } catch (error) {
    console.error('Error adding product:', error);
    console.error('Error details:', error.response);
    throw error;
  }
};

export const getAppointments = async () => {
  try {
    const response = await apiClient.get(`${API}?type=appointments`);
    return response;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};