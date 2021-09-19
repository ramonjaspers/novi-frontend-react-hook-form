import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: 'onChange' });
  const onSubmit = data => console.log(data);
  console.log(errors);

  const selectedReferrer = watch('Bezorgfrequentie');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Voornaam" {...register("Voornaam", { required: "Voornaam is verplicht", maxLength: 80 })} />
      {errors.Voornaam && <span>{errors.Voornaam.message}</span>}<br />
      <input type="text" placeholder="Achternaam" {...register("Achternaam", { required: "Achternaam is verplicht", maxLength: 100 })} />
      {errors.Achternaam && <span>{errors.Achternaam.message}</span>} <br />
      <input type="number" placeholder="Leeftijd" {...register("Leeftijd", {
        required: "Leeftijd is verplicht",
        min: {
          value: 18,
          message: "Leeftijd moet hoger zijn dan 18"
        },
        pattern: /^\S+@\S+$/i
      })} />
      {errors.Leeftijd && <span>{errors.Leeftijd.message}</span>} <br />
      <input type="text" placeholder="Postcode" {...register("Postcode", { required: "Postcode is verplicht", pattern: {value: /^\d{4}?[a-z]{2}$/i, message: "Invalide postcode"}})} />
      {errors.Postcode && <span>{errors.Postcode.message}</span>} <br />
      <select {...register("Bezorgfrequentie", { required: "Een keuze is verplicht" })}>
        <option value="iedere week">iedere week</option>
        <option value="om de week">om de week</option>
        <option value="iedere maand">iedere maand</option>
        <option value="anders">anders</option>
      </select>
      {errors.Bezorgfrequentie && <span>{errors.Bezorgfrequentie.message}</span>} <br />

      {selectedReferrer === "anders" &&
      <>
        <input
          type="text"
          placeholder="Andere frequentie als tekstveld" {...register(
            "afat",
            { required: "Veld is verplicht" }
          )}
        />
        {errors.afat && <span>{errors.afat.message}</span>} <br />
        </>
      }

      <input type="text" placeholder="Opmerkingen" {...register("Opmerkingen", {})} />
      <input type="checkbox" placeholder="Akkoord met de voorwaarden als checkbox" {...register("voorwaarden", { required: "U dient akkoord te gaan met de voorwaarden" })} />
        {errors.voorwaarden && <span>{errors.voorwaarden.message}</span>} <br />

      <input type="submit" />
    </form>
  );
}