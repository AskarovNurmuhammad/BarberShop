"use client";
import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { supabase } from "@/app/supbaseClient";
import { log } from "console";

interface Service {
  id?: string;
  name: string;
  time: string;
  price: number;
}

function Services() {
  const [visible, setVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [service, setService] = useState<Service>({
    name: "",
    time: "",
    price: 0,
  });
  const [servicesList, setServicesList] = useState<Service[]>([]);

  // Fetch all services from Supabase
  const fetchServices = async () => {
    const { data, error } = await supabase.from("services").select("*");
    if (error) {
      console.error("Xatolik yuklashda:", error.message);
    } else {
      setServicesList(data || []);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Save or Update service
  const handleSave = async () => {
    console.log(service);

    if (editingId) {
      const { error } = await supabase
        .from("services")
        .update(service)
        .eq("id", editingId);

      if (error) {
        console.error("Yangilashda xatolik:", error.message);
      }
    } else {
      const { error } = await supabase.from("services").insert([service]);

      if (error) {
        console.error("Qo‘shishda xatolik:", error.message);
      }
    }

    setVisible(false);
    setService({ name: "", time: "", price: 0 });
    setEditingId(null);
    fetchServices();
  };

  // Delete service
  const deleteService = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      console.error("O‘chirishda xatolik:", error.message);
    }
    fetchServices();
  };

  // Edit modal ochish
  const editService = (srv: Service) => {
    setService(srv);
    setEditingId(srv.id || null);
    setVisible(true);
  };

  const handleAddNew = () => {
    setService({ name: "", time: "", price: 0 });
    setEditingId(null);
    setVisible(true);
  };

  return (
    <div className="container">
      <button
        className="btn btn-success"
        onClick={handleAddNew}
        style={{ margin: "20px" }}
      >
        + Add Services
      </button>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Time</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {servicesList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.time} min</td>
              <td>{item.price} $</td>
              <td className="d-flex gap-2 justify-center">
                <button
                  className="btn btn-warning"
                  onClick={() => editService(item)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteService(item.id!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Rodal
        visible={visible}
        onClose={() => {
          setVisible(false);
          setEditingId(null);
          setService({ name: "", time: "", price: 0 });
        }}
        width={500}
        height={300}
        customStyles={{
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2>{editingId ? "Edit Service" : "Add Service"}</h2>
        <input
          type="text"
          value={service.name}
          className="form-control"
          placeholder="Name..."
          onChange={(e) => setService({ ...service, name: e.target.value })}
        />
        <input
          type="text"
          value={service.time}
          className="form-control"
          placeholder="Time (e.g. 30)"
          onChange={(e) => setService({ ...service, time: e.target.value })}
        />
        <input
          type="number"
          value={service.price || ""}
          className="form-control"
          placeholder="Price..."
          onChange={(e) =>
            setService({ ...service, price: parseInt(e.target.value || "0") })
          }
        />
        <button className="btn btn-primary" onClick={handleSave}>
          {editingId ? "Update" : "Save"}
        </button>
      </Rodal>
    </div>
  );
}

export default Services;
