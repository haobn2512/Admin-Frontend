// import {
//   Table,
//   Button,
//   Space,
//   Modal,
//   Form,
//   Input,
//   Select,
//   message,
//   Tabs,
//   Upload,
//   Popconfirm,
//   Tag,
// } from "antd";
// import {
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   UploadOutlined,
// } from "@ant-design/icons";
// import { useEffect, useState } from "react";
// import api from "../../utils/axios"; // ⚙️ Import axios cấu hình sẵn

// const { Option } = Select;
// const { TabPane } = Tabs;

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [form] = Form.useForm();
//   const [detailModal, setDetailModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // =====================================================
//   // 📦 LẤY DANH SÁCH SẢN PHẨM
//   // =====================================================
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       // ✅ GẮN API THẬT Ở ĐÂY (ví dụ: /api/SanPham/GetAll)
//       const res = await api.get("/sanpham");
//       setProducts(res.data || []);
//     } catch (err) {
//       console.error(err);
//       message.error("Không thể tải danh sách sản phẩm");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // =====================================================
//   // 💾 THÊM / SỬA SẢN PHẨM
//   // =====================================================
//   const handleSave = async (values) => {
//     try {
//       if (editingProduct) {
//         // ✅ GẮN API THẬT (PUT /api/SanPham/{id})
//         await api.put(`/sanpham/${editingProduct.sanPhamId}`, values);
//         message.success("Cập nhật sản phẩm thành công");
//       } else {
//         // ✅ GẮN API THẬT (POST /api/SanPham)
//         await api.post("/sanpham", values);
//         message.success("Thêm sản phẩm thành công");
//       }
//       fetchProducts();
//       setOpenModal(false);
//       form.resetFields();
//     } catch (err) {
//       console.error(err);
//       message.error("Lưu sản phẩm thất bại");
//     }
//   };

//   // =====================================================
//   // 🗑️ XOÁ SẢN PHẨM
//   // =====================================================
//   const handleDelete = async (id) => {
//     try {
//       // ✅ GẮN API THẬT (DELETE /api/SanPham/{id})
//       await api.delete(`/sanpham/${id}`);
//       message.success("Đã xoá sản phẩm");
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       message.error("Xoá thất bại");
//     }
//   };

//   // =====================================================
//   // 👁️ XEM CHI TIẾT
//   // =====================================================
//   const handleView = async (record) => {
//     try {
//       // ✅ GẮN API THẬT (GET /api/SanPham/{id})
//       const res = await api.get(`/sanpham/${record.sanPhamId}`);
//       setSelectedProduct(res.data);
//       setDetailModal(true);
//     } catch (err) {
//       console.error(err);
//       message.error("Không thể tải chi tiết sản phẩm");
//     }
//   };

//   // =====================================================
//   // 📊 CỘT BẢNG
//   // =====================================================
//   const columns = [
//     { title: "Tên sản phẩm", dataIndex: "tenSanPham", key: "tenSanPham" },
//     {
//       title: "Danh mục",
//       render: (_, record) => record.danhMuc?.tenDanhMuc || "—",
//     },
//     {
//       title: "Chất liệu",
//       render: (_, record) => record.chatLieu?.tenChatLieu || "—",
//     },
//     {
//       title: "Phong cách",
//       render: (_, record) => record.phongCach?.tenPhongCach || "—",
//     },
//     {
//       title: "Giới tính",
//       render: (_, record) => record.gioiTinh?.tenGioiTinh || "—",
//     },
//     {
//       title: "Giá gốc",
//       dataIndex: "giaGoc",
//       render: (val) => `${val?.toLocaleString()} ₫`,
//     },
//     {
//       title: "Trạng thái",
//       dataIndex: "trangThai",
//       render: (val) =>
//         val ? <Tag color="green">Đang bán</Tag> : <Tag color="red">Ngừng bán</Tag>,
//     },
//     {
//       title: "Thao tác",
//       key: "actions",
//       render: (_, record) => (
//         <Space>
//           <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => {
//               setEditingProduct(record);
//               form.setFieldsValue(record);
//               setOpenModal(true);
//             }}
//             type="primary"
//           />
//           <Popconfirm
//             title="Xóa sản phẩm này?"
//             onConfirm={() => handleDelete(record.sanPhamId)}
//           >
//             <Button danger icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Space
//         style={{
//           marginBottom: 16,
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         <Input.Search
//           placeholder="Tìm sản phẩm..."
//           onSearch={(value) =>
//             setProducts((prev) =>
//               prev.filter((p) =>
//                 p.tenSanPham.toLowerCase().includes(value.toLowerCase())
//               )
//             )
//           }
//           style={{ width: 300 }}
//         />
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={() => {
//             setEditingProduct(null);
//             setOpenModal(true);
//           }}
//         >
//           Thêm sản phẩm
//         </Button>
//       </Space>

//       <Table
//         dataSource={products}
//         columns={columns}
//         loading={loading}
//         rowKey="sanPhamId"
//         bordered
//       />

//       {/* MODAL THÊM / SỬA */}
//       <Modal
//         title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
//         open={openModal}
//         onCancel={() => setOpenModal(false)}
//         onOk={() => form.submit()}
//         okText="Lưu"
//         cancelText="Hủy"
//         width={600}
//       >
//         <Form layout="vertical" form={form} onFinish={handleSave}>
//           <Form.Item
//             label="Tên sản phẩm"
//             name="tenSanPham"
//             rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item label="Mô tả" name="moTa">
//             <Input.TextArea rows={3} />
//           </Form.Item>
//           <Form.Item label="Giá gốc" name="giaGoc">
//             <Input type="number" min={0} />
//           </Form.Item>
//           <Form.Item label="Thương hiệu" name="thuongHieu">
//             <Input />
//           </Form.Item>
//           <Form.Item label="Bảo hành" name="baoHanh">
//             <Input />
//           </Form.Item>
//           <Form.Item label="Trạng thái" name="trangThai" initialValue={true}>
//             <Select>
//               <Option value={true}>Đang bán</Option>
//               <Option value={false}>Ngừng bán</Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* MODAL CHI TIẾT */}
//       <Modal
//         open={detailModal}
//         title="Chi tiết sản phẩm"
//         onCancel={() => setDetailModal(false)}
//         footer={null}
//         width={900}
//       >
//         {selectedProduct && (
//           <Tabs defaultActiveKey="1">
//             <TabPane tab="Thông tin chung" key="1">
//               <p><b>Tên:</b> {selectedProduct.tenSanPham}</p>
//               <p><b>Thương hiệu:</b> {selectedProduct.thuongHieu}</p>
//               <p><b>Giá gốc:</b> {selectedProduct.giaGoc?.toLocaleString()} ₫</p>
//               <p><b>Danh mục:</b> {selectedProduct.danhMuc?.tenDanhMuc || "—"}</p>
//               <p><b>Chất liệu:</b> {selectedProduct.chatLieu?.tenChatLieu || "—"}</p>
//               <p><b>Phong cách:</b> {selectedProduct.phongCach?.tenPhongCach || "—"}</p>
//               <p><b>Giới tính:</b> {selectedProduct.gioiTinh?.tenGioiTinh || "—"}</p>
//               <p><b>Xuất xứ:</b> {selectedProduct.xuatXu?.tenNuoc || "—"}</p>
//             </TabPane>

//             <TabPane tab="Biến thể" key="2">
//               <Table
//                 dataSource={selectedProduct.bienTheSanPham || []}
//                 columns={[
//                   { title: "Kích cỡ", dataIndex: ["kichCo", "tenKichCo"] },
//                   { title: "Màu sắc", dataIndex: ["mauSac", "tenMau"] },
//                   { title: "Giá bán", dataIndex: "giaBan" },
//                   { title: "Tồn kho", dataIndex: "soLuongTon" },
//                 ]}
//                 pagination={false}
//                 rowKey="bienTheId"
//               />
//             </TabPane>

//             <TabPane tab="Hình ảnh" key="3">
//               <Upload
//                 listType="picture-card"
//                 fileList={
//                   selectedProduct.hinhAnhSanPham?.map((img) => ({
//                     uid: img.hinhAnhId,
//                     url: img.url,
//                     name: `Ảnh ${img.hinhAnhId}`,
//                     status: "done",
//                   })) || []
//                 }
//                 showUploadList={{ showRemoveIcon: false }}
//                 itemRender={(originNode, file) => (
//                   <img
//                     src={file.url}
//                     alt="Ảnh sản phẩm"
//                     style={{
//                       width: 100,
//                       height: 100,
//                       objectFit: "cover",
//                       borderRadius: 6,
//                     }}
//                   />
//                 )}
//               >
//                 <Button icon={<UploadOutlined />}>Thêm ảnh</Button>
//               </Upload>
//             </TabPane>
//           </Tabs>
//         )}
//       </Modal>
//     </div>
//   );
// }
export default function Dashboard() {
  return <h1>Quản lý sản phẩm</h1>;
}