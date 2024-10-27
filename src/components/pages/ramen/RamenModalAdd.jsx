import { ImagePlusIcon, Minus, Plus, Upload, X } from "lucide-react";
import React from "react";
import ModalWrapper from "../partials/modals/ModalWrapper";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";
import {
  setIsAdd,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import {
  InputPhotoUpload,
  InputSelect,
  InputText,
} from "@/components/helpers/FormInputs";
import useUploadPhoto from "@/components/custom-hooks/useUploadPhoto";
import { imgPath } from "@/components/helpers/functions-general";

const RamenModalAdd = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto(
    "/v1/upload-photo",
    dispatch
  );
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit ? `/v1/ramen/${itemEdit.ramen_aid}` : `/v1/ramen`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["ramen"],
      });

      // show error box
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully updated.`));
        dispatch(setIsAdd(false));
      }
    },
  });

  const initVal = {
    ramen_aid: itemEdit ? itemEdit.ramen_aid : "",
    ramen_title: itemEdit ? itemEdit.ramen_title : "",
    ramen_price: itemEdit ? itemEdit.ramen_price : "",
    ramen_image: itemEdit ? itemEdit.ramen_image : "",
    ramen_category: itemEdit ? itemEdit.ramen_category : "",
    ramen_ingredients: itemEdit ? JSON.parse(itemEdit.ramen_ingredients) : [""],
    ramen_title_old: itemEdit ? itemEdit.ramen_title : "",
  };

  const yupSchema = Yup.object({
    ramen_title: Yup.string().required("require"),
    ramen_price: Yup.string().required("require"),
    ramen_category: Yup.string().required("require"),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  return (
    <ModalWrapper>
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // uploadPhoto();

          if (photo === "") {
            dispatch(setValidate(true));
            dispatch(setMessage("Image Required"));
            return;
          }

          mutation.mutate({
            ...values,
            ramen_ingredients: values.ramen_ingredients,
            ramen_image:
              (itemEdit && itemEdit.ramen_image === "") || photo
                ? photo === null
                  ? itemEdit.ramen_image
                  : photo.name
                : values.ramen_image,
          });
        }}
      >
        {({ values }) => {
          return (
            <Form className="">
              <div className="modal-main absolute top-0 right-0 h-[100dvh] w-[320px] bg-primary border-l border-line grid grid-rows-[auto,_1fr,_auto] ">
                <div className="modal-header p-3 px-4 pb-0 flex justify-between items-center self-start">
                  <h5 className="mb-0">Add Movie</h5>
                  <button onClick={handleClose}>
                    <X />
                  </button>
                </div>

                <div className="modal-body  p-3 px-4 ">
                  <div className="w-full h-[150px] border border-line  rounded-md mb-1.5">
                    <div className="input-wrap relative  group input-photo-wrap h-[150px] ">
                      {itemEdit === null && photo === null ? (
                        <div className="w-full  rounded-md flex justify-center items-center flex-col h-full">
                          <ImagePlusIcon
                            size={50}
                            strokeWidth={1}
                            className="opacity-20 group-hover:opacity-50 transition-opacity"
                          />
                          <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                            Upload Photo
                          </small>
                        </div>
                      ) : (
                        <img
                          src={
                            photo
                              ? URL.createObjectURL(photo) // preview
                              : imgPath + "/" + itemEdit?.ramen_image // check db
                          }
                          alt="employee photo"
                          className="group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto"
                        />
                      )}

                      <InputPhotoUpload
                        name="photo"
                        type="file"
                        id="photo"
                        accept="image/*"
                        title="Upload photo"
                        onChange={(e) => handleChangePhoto(e)}
                        onDrop={(e) => handleChangePhoto(e)}
                        className="opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="input-wrap">
                    <InputText
                      label="Title"
                      type="text"
                      name="ramen_title"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrap">
                    <InputText
                      label="Price"
                      type="number"
                      name="ramen_price"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="input-wrap">
                    <InputSelect
                      label="Category"
                      name="ramen_category"
                      // disabled={mutation.isLoading || loadingCategory}
                    >
                      <optgroup label="Select Category">
                        <option value="" hidden>
                          Select Category
                        </option>
                        <option value="shoyu-tonkotsu">Shoyu Tonkotsu</option>
                        <option value="miso-tonkotsu">Miso Tonkotsu</option>
                        <option value="shoyu-shikatake">Shoyu Shikatake</option>
                        <option value="fish-tonkotsu">Fish Tonkotsu</option>
                        <option value="tomato-tonkotsu">Tomato Tonkotsu</option>
                        <option value="lemongrass-tonkotsu">
                          Lemograss Tonkotsu
                        </option>
                      </optgroup>
                    </InputSelect>
                  </div>

                  <div className="input-wrap relative">
                    <label
                      htmlFor="ramen_ingredients"
                      className="absolute top-5 left-0"
                    >
                      Ingredients
                    </label>
                    <FieldArray name="ramen_ingredients">
                      {({ remove, push }) => {
                        return (
                          <div className="mt-5">
                            <button
                              type="button"
                              className="btn btn-accent ml-auto mb-2"
                              onClick={() => push("")}
                            >
                              Add
                            </button>

                            {values.ramen_ingredients.map(
                              (ingredient, index) => (
                                <div
                                  className="flex gap-5 relative mb-6 "
                                  key={index}
                                >
                                  <Field
                                    name={`ramen_ingredients.${index}`}
                                    type="text"
                                    className="w-full"
                                  />

                                  {index > 0 && (
                                    <button
                                      type="button"
                                      className="absolute -top-4 right-1 text-xs text-alert"
                                      onClick={() => remove(index)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>
                </div>
                <div className="modal-action flex justify-end gap-3 items-center p-3 px-4 pb-5 self-start">
                  <button
                    className="btn btn-accent min-w-[90px] flex justify-center"
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-cancel min-w-[90px] flex justify-center"
                    type="reset"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </ModalWrapper>
  );
};

export default RamenModalAdd;
