"use client";
import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { supabase } from "@/app/supbaseClient";

interface Master {
  id?: string;
  name: string;
  skills: string;
  phone: number;
}

function Master() {
  const [visible, setVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [masters, setMasters] = useState<Master>({
    name: "",
    skills: "",
    phone: 0,
  });
  const [mastersList, setMastersList] = useState<Master[]>([]);

  const fetchMasters = async () => {
    const { data, error } = await supabase.from("masters").select("*");
    if (error) {
      console.error("Yuklashda xatolik:", error);
    } else {
      setMastersList(data || []);
    }
  };

  useEffect(() => {
    fetchMasters();
  }, []);

  const handleSave = async () => {
    if (editingId) {
      const { error } = await supabase
        .from("masters")
        .update(masters)
        .eq("id", editingId);

      if (error) {
        console.error("Yangilashda xatolik:", error);
      }
    } else {
      const { error } = await supabase.from("masters").insert([masters]);
      if (error) {
        console.error("Qo'shishda xatolik:", error);
      }
    }

    fetchMasters();
    setVisible(false);
    setMasters({ name: "", skills: "", phone: 0 });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("masters").delete().eq("id", id);
    if (error) {
      console.error("O‘chirishda xatolik:", error);
    }
    fetchMasters();
  };

  const handleEdit = (master: Master) => {
    setMasters(master);
    setEditingId(master.id || null);
    setVisible(true);
  };

  const handleAddNew = () => {
    setMasters({ name: "", skills: "", phone: 0 });
    setEditingId(null);
    setVisible(true);
  };

  return (
    <div className="container">
      <button
        className="btn btn-primary"
        onClick={handleAddNew}
        style={{ margin: "20px" }}
      >
        Add Master
      </button>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Skills</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mastersList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.skills}</td>
              <td>{item.phone}</td>
              <td className="d-flex gap-2 justify-center">
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(item)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id!)}
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
          setMasters({ name: "", skills: "", phone: 0 });
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
        <h2>{editingId ? "Edit Master" : "Add Master"}</h2>
        <input
          type="text"
          value={masters.name}
          className="form-control"
          placeholder="Name..."
          onChange={(e) => setMasters({ ...masters, name: e.target.value })}
        />
        <select
          className="form-control"
          value={masters.skills}
          onChange={(e) => setMasters({ ...masters, skills: e.target.value })}
        >
          <option value="">Select skill</option>
          <option value="Mutaxasis">Mutaxasis</option>
          <option value="O'rtacha">O&apos;rtacha</option>
          <option value="Boshlangich">Boshlangich</option>
        </select>

        <input
          type="number"
          value={masters.phone || ""}
          className="form-control"
          placeholder="Phone..."
          onChange={(e) =>
            setMasters({ ...masters, phone: parseInt(e.target.value || "0") })
          }
        />
        <button className="btn btn-success" onClick={handleSave}>
          {editingId ? "Update" : "Save"}
        </button>
      </Rodal>
    </div>
  );
}

export default Master;
