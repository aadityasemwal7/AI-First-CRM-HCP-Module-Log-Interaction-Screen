import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInteraction, updateInteraction, clearSelectedInteraction } from "../../redux/interactionSlice";
import FormField from "../ui/FormField";

/**
 * Form connected to Redux and FastAPI.
 * Handles both Creating (Log) and Updating (Edit) an interaction.
 *
 * @returns {JSX.Element} The rendered component.
 */

const INTERACTION_TYPES = [
  { value: "Visit", label: "In-Person Visit" },
  { value: "Call", label: "Phone Call" },
  { value: "Email", label: "Email" },
  { value: "Conference", label: "Conference" },
];

const inputBase =
  "w-full px-4 py-2.5 text-sm border rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all";
const inputNormal =
  `${inputBase} border-gray-200 focus:ring-primary-500/20 focus:border-primary-400`;
const inputError =
  `${inputBase} border-red-400 focus:ring-red-500/20 focus:border-red-500`;

const InteractionForm = () => {
  const dispatch = useDispatch();
  const { loading, error, selectedInteraction } = useSelector((state) => state.interaction);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [localError, setLocalError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hcpName: "",
      hcpSpecialty: "",
      interactionType: "",
      interactionDate: new Date().toISOString().split("T")[0],
      discussionNotes: "",
      nextAction: "",
      followUpDate: "",
    },
  });

  // Populate form when an interaction is selected for editing
  useEffect(() => {
    if (selectedInteraction) {
      reset({
        hcpName: selectedInteraction.hcp_name,
        hcpSpecialty: selectedInteraction.hcp_specialty,
        interactionType: selectedInteraction.interaction_type,
        interactionDate: selectedInteraction.interaction_date
          ? new Date(selectedInteraction.interaction_date).toISOString().split("T")[0]
          : "",
        discussionNotes: selectedInteraction.discussion_notes || "",
        nextAction: selectedInteraction.next_action || "",
        followUpDate: selectedInteraction.follow_up_date
          ? new Date(selectedInteraction.follow_up_date).toISOString().split("T")[0]
          : "",
      });
      setSubmitSuccess(false);
      setLocalError(null);
    } else {
      reset({
        hcpName: "",
        hcpSpecialty: "",
        interactionType: "",
        interactionDate: new Date().toISOString().split("T")[0],
        discussionNotes: "",
        nextAction: "",
        followUpDate: "",
      });
    }
  }, [selectedInteraction, reset]);

  const onSubmit = async (data) => {
    setSubmitSuccess(false);
    setLocalError(null);

    // Map to FastAPI schema
    const payload = {
      hcp_name: data.hcpName,
      hcp_specialty: data.hcpSpecialty,
      interaction_type: data.interactionType,
      interaction_date: new Date(data.interactionDate).toISOString(),
      discussion_notes: data.discussionNotes || "",
      next_action: data.nextAction,
      follow_up_date: data.followUpDate ? new Date(data.followUpDate).toISOString() : null,
    };

    try {
      if (selectedInteraction) {
        await dispatch(updateInteraction({ id: selectedInteraction.id, updateData: payload })).unwrap();
        dispatch(clearSelectedInteraction());
      } else {
        await dispatch(logInteraction(payload)).unwrap();
        reset();
      }
      
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      setLocalError(err.message || "Failed to save interaction.");
    }
  };

  const getInputClass = (fieldName) =>
    errors[fieldName] ? inputError : inputNormal;

  const isEditMode = !!selectedInteraction;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isEditMode ? 'bg-amber-50' : 'bg-primary-50'}`}>
            <svg className={`w-5 h-5 ${isEditMode ? 'text-amber-600' : 'text-primary-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isEditMode ? (
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              )}
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {isEditMode ? "Edit Interaction" : "Log Interaction"}
            </h2>
            <p className="text-xs text-gray-400">
              {isEditMode ? "Update the selected interaction" : "Record a new HCP interaction"}
            </p>
          </div>
        </div>
        {isEditMode && (
          <button 
            type="button" 
            onClick={() => dispatch(clearSelectedInteraction())}
            className="text-xs font-medium text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Form Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        <FormField label="HCP Name" required error={errors.hcpName?.message}>
          <input
            type="text"
            placeholder="Dr. John Smith"
            className={getInputClass("hcpName")}
            {...register("hcpName", {
              required: "HCP Name is required",
              minLength: { value: 2, message: "Must be at least 2 characters" },
            })}
          />
        </FormField>

        <FormField label="HCP Specialty" required error={errors.hcpSpecialty?.message}>
          <input
            type="text"
            placeholder="Cardiology"
            className={getInputClass("hcpSpecialty")}
            {...register("hcpSpecialty", {
              required: "Specialty is required",
            })}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Interaction Type" required error={errors.interactionType?.message}>
            <select
              className={`${getInputClass("interactionType")} appearance-none`}
              {...register("interactionType", {
                required: "Please select a type",
              })}
            >
              <option value="">Select type</option>
              {INTERACTION_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Interaction Date" required error={errors.interactionDate?.message}>
            <input
              type="date"
              className={getInputClass("interactionDate")}
              {...register("interactionDate", {
                required: "Date is required",
              })}
            />
          </FormField>
        </div>

        <FormField label="Discussion Notes" error={errors.discussionNotes?.message}>
          <textarea
            rows={3}
            placeholder="Key discussion points…"
            className={`${getInputClass("discussionNotes")} resize-none`}
            {...register("discussionNotes")}
          />
        </FormField>

        <FormField label="Next Action" required error={errors.nextAction?.message}>
          <input
            type="text"
            placeholder="Schedule follow-up call"
            className={getInputClass("nextAction")}
            {...register("nextAction", {
              required: "Next action is required",
            })}
          />
        </FormField>

        <FormField label="Follow-up Date" error={errors.followUpDate?.message}>
          <input
            type="date"
            className={getInputClass("followUpDate")}
            {...register("followUpDate")}
          />
        </FormField>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 space-y-3">
        {(localError || error) && (
           <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 text-sm font-medium rounded-xl">
             <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
             </svg>
             {localError || error}
           </div>
        )}

        {submitSuccess && !localError && !error && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-xl">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Interaction {isEditMode ? "updated" : "logged"} successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 px-4 text-white text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2
            ${isEditMode 
              ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/20 disabled:from-amber-300 disabled:to-amber-400" 
              : "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-primary-500/20 disabled:from-primary-400 disabled:to-primary-300"}
          `}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Saving…
            </>
          ) : (
            isEditMode ? "Update Interaction" : "Log Interaction"
          )}
        </button>
      </div>
    </form>
  );
};

export default InteractionForm;
