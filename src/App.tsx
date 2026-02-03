import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from '@/components/Layout'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'
import Colaboradores from '@/pages/Colaboradores'
import Recrutamento from '@/pages/Recrutamento'
import Ponto from '@/pages/Ponto'
import Ferias from '@/pages/Ferias'
import Avaliacoes from '@/pages/Avaliacoes'
import Relatorios from '@/pages/Relatorios'
import Login from '@/pages/Login'
import { AuthProvider } from '@/hooks/use-auth'
import ProtectedRoute from '@/components/ProtectedRoute'

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
  >
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Index />} />
            <Route path="/colaboradores" element={<Colaboradores />} />
            <Route path="/recrutamento" element={<Recrutamento />} />
            <Route path="/ponto" element={<Ponto />} />
            <Route path="/ferias" element={<Ferias />} />
            <Route path="/avaliacoes" element={<Avaliacoes />} />
            <Route path="/relatorios" element={<Relatorios />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
