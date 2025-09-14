'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
import React from "react";

// tipagem das props que o componente espera receber
type SearchBarProps = {
    value: string; // valor atual do input
    onChange: (value: string) => void; // função chamada quando é digitado algo
    placeholder?: string; // texto exibido quando o input está vazio
}

export default function SearchBar ({ value, onChange, placeholder }: SearchBarProps) {
    return(
        <div className="mb-6 flex justify-center">
            <input
                type="text"
                placeholder={placeholder || "Buscar..."}
                value={value} // valor atual do input
                onChange={(e) => onChange(e.target.value)} // chama a função recebida ao digitar
                className="w-full sm:w1/2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    )
}