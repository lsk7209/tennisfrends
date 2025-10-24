import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-[#0BA360] hover:bg-[#0BA360]/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">이용약관</h1>
            <p className="text-[#64748B]">테니스프렌즈 서비스 이용약관</p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>제1조 (목적)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#64748B] leading-relaxed">
              본 약관은 테니스프렌즈(이하 "회사")가 제공하는 테니스 관련 유틸리티 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제2조 (정의)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">1. "서비스"란</h4>
                <p className="text-[#64748B]">회사가 제공하는 NTRP 실력 분석, 테니스 성향 분석, 부상 위험도 체크, 스트링 텐션 계산기, 테니스 규칙 퀴즈 등의 온라인 유틸리티 서비스를 의미합니다.</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">2. "이용자"란</h4>
                <p className="text-[#64748B]">서비스에 접속하여 본 약관에 따라 서비스를 이용하는 자를 의미합니다.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제3조 (서비스의 제공)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-[#64748B] leading-relaxed">
                회사는 다음과 같은 서비스를 제공합니다:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#64748B]">
                <li>NTRP 실력 테스트 및 분석 서비스</li>
                <li>테니스 성향 7유형 분석 서비스</li>
                <li>부상 위험도 체크 및 예방 가이드</li>
                <li>스트링 텐션 계산기</li>
                <li>테니스 규칙 퀴즈</li>
                <li>기타 테니스 관련 유틸리티 서비스</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제4조 (서비스 이용)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-[#64748B] leading-relaxed">
                1. 서비스는 무료로 제공되며, 별도의 회원가입 없이 이용할 수 있습니다.
              </p>
              <p className="text-[#64748B] leading-relaxed">
                2. 이용자는 서비스 이용 시 정확한 정보를 입력하여야 하며, 부정확한 정보 입력으로 인한 결과에 대해서는 회사가 책임지지 않습니다.
              </p>
              <p className="text-[#64748B] leading-relaxed">
                3. 서비스의 결과는 참고용이며, 실제 테니스 실력이나 의학적 진단을 대체하지 않습니다.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제5조 (개인정보 보호)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#64748B] leading-relaxed">
              회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하여 운영하며, 이는 서비스 화면에 게시하거나 링크를 통해 확인할 수 있습니다.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제6조 (서비스의 중단)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#64748B] leading-relaxed">
              회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제7조 (면책조항)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-[#64748B] leading-relaxed">
                1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
              </p>
              <p className="text-[#64748B] leading-relaxed">
                2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
              </p>
              <p className="text-[#64748B] leading-relaxed">
                3. 회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖에 서비스를 통하여 얻은 자료로 인한 손해에 관하여는 책임을 지지 않습니다.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제8조 (약관의 개정)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#64748B] leading-relaxed">
              회사는 필요에 따라 본 약관을 개정할 수 있으며, 개정된 약관은 서비스 화면에 공지함으로써 효력을 발생합니다.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#64748B]">
            본 약관은 2024년 1월 1일부터 시행됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
