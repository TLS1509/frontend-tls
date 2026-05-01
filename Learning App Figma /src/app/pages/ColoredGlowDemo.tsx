import React from 'react';
import { Video, Route, BookMarked, TrendingUp, Star, Zap, Award, Target } from 'lucide-react';
import { ActionCard, ActionCardMini } from '../components/patterns/CardPatterns';
import { SectionContainer } from '../components/common/SectionContainer';
import { SectionHeader } from '../components/common/SectionHeader';

/**
 * Colored Glow Demo Page
 * Démontre le système de glow coloré dynamique basé sur la couleur d'icône
 */
export default function ColoredGlowDemo() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #E8F4F7 0%, #FFF4E6 50%, #FFF9E6 100%)',
      padding: 'var(--space-12)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--space-12)',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            marginBottom: 'var(--space-3)',
          }}>
            🌟 Colored Glow Hover Demo
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--muted-foreground)',
          }}>
            Survolez les cards pour voir le glow coloré dynamique basé sur la couleur de l'icône
          </p>
        </div>

        {/* Section 1: ActionCard - Couleurs TLS principales */}
        <SectionContainer className="mb-16">
          <SectionHeader
            title="ActionCard - Couleurs TLS Principales"
            subtitle="Glow adaptatif : Bleu (Primary), Orange (Secondary), Jaune (Accent)"
          />
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: 'var(--space-4)',
          }}>
            <ActionCard
              icon={Video}
              iconColor="var(--primary)"
              title="Coaching"
              description="Glow bleu au hover"
              onClick={() => alert('Coaching clicked!')}
            />
            
            <ActionCard
              icon={Route}
              iconColor="var(--secondary)"
              title="Parcours"
              description="Glow orange au hover"
              onClick={() => alert('Parcours clicked!')}
            />
            
            <ActionCard
              icon={BookMarked}
              iconColor="var(--accent)"
              title="Journal"
              description="Glow jaune au hover"
              onClick={() => alert('Journal clicked!')}
            />
            
            <ActionCard
              icon={TrendingUp}
              iconColor="var(--primary-light)"
              title="Veille"
              description="Glow bleu-vert au hover"
              onClick={() => alert('Veille clicked!')}
            />
          </div>
        </SectionContainer>

        {/* Section 2: ActionCard - Couleurs Semantiques */}
        <SectionContainer className="mb-16">
          <SectionHeader
            title="ActionCard - Couleurs Sémantiques"
            subtitle="Couleurs sémantiques avec glow coloré adaptatif ultra-subtil"
          />
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: 'var(--space-4)',
          }}>
            <ActionCard
              icon={Award}
              iconColor="var(--success)"
              title="Success"
              description="Glow vert succès"
              onClick={() => {}}
            />
            
            <ActionCard
              icon={Zap}
              iconColor="var(--warning)"
              title="Warning"
              description="Glow jaune avertissement"
              onClick={() => {}}
            />
            
            <ActionCard
              icon={Target}
              iconColor="var(--error)"
              title="Error"
              description="Glow rouge erreur"
              onClick={() => {}}
            />
            
            <ActionCard
              icon={Star}
              iconColor="var(--info)"
              title="Info"
              description="Glow bleu info"
              onClick={() => {}}
            />
          </div>
        </SectionContainer>

        {/* Section 3: ActionCardMini */}
        <SectionContainer className="mb-16">
          <SectionHeader
            title="ActionCardMini - Format Compact"
            subtitle="Même système de glow coloré en version mini"
          />
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
            gap: 'var(--space-3)',
          }}>
            <ActionCardMini
              icon={Video}
              iconColor="var(--primary)"
              title="Bleu"
              onClick={() => {}}
            />
            
            <ActionCardMini
              icon={Route}
              iconColor="var(--secondary)"
              title="Orange"
              onClick={() => {}}
            />
            
            <ActionCardMini
              icon={BookMarked}
              iconColor="var(--accent)"
              title="Jaune"
              onClick={() => {}}
            />
            
            <ActionCardMini
              icon={Star}
              iconColor="var(--success)"
              title="Vert"
              onClick={() => {}}
            />
            
            <ActionCardMini
              icon={Award}
              iconColor="var(--error)"
              title="Rouge"
              onClick={() => {}}
            />
          </div>
        </SectionContainer>

        {/* Section 4: Couleurs Hex Direct */}
        <SectionContainer>
          <SectionHeader
            title="Couleurs Hex Directes"
            subtitle="Support des couleurs hex (#55A1B4) en plus des variables CSS"
          />
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: 'var(--space-4)',
          }}>
            <ActionCard
              icon={Video}
              iconColor="#55A1B4"
              title="Bleu Hex"
              description="Glow bleu #55A1B4"
              onClick={() => {}}
            />
            
            <ActionCard
              icon={Route}
              iconColor="#ED843A"
              title="Orange Hex"
              description="Glow orange #ED843A"
              onClick={() => {}}
            />
            
            <ActionCard
              icon={BookMarked}
              iconColor="#F8B044"
              title="Jaune Hex"
              description="Glow jaune #F8B044"
              onClick={() => {}}
            />
          </div>
        </SectionContainer>

        {/* Info Box */}
        <div style={{
          marginTop: 'var(--space-12)',
          padding: 'var(--space-8)',
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            marginBottom: 'var(--space-3)',
          }}>
            💡 Comment ça marche ?
          </h3>
          <ul style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            color: 'var(--muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            paddingLeft: 'var(--space-6)',
          }}>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Glow dynamique :</strong> La couleur du box-shadow au hover s'adapte automatiquement à la couleur de l'icône
            </li>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Ultra-subtil et diffus :</strong> 8% opacité pour shadow principale (60px blur) + 4% pour secondaire (32px blur)
            </li>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Support multi-format :</strong> Variables CSS (var(--primary)), Hex (#55A1B4), RGB, RGBA
            </li>
            <li>
              <strong>Couleur spéciale Veille :</strong> Bleu-vert du gradient TLS (var(--primary-light) #7BC4D4)
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
