import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-bold text-[#0F172A]">개인정보처리방침</h1>
            <p className="text-[#64748B]">테니스프렌즈 개인정보처리방침</p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>제1조 (개인정보의 처리목적)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#64748B] leading-relaxed">
              테니스프렌즈는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#64748B] mt-4">
              <li>서비스 제공 및 운영</li>
              <li>서비스 개선 및 신규 서비스 개발</li>
              <li>서비스 이용 통계 분석</li>
              <li>고객 문의 및 불만 처리</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제2조 (개인정보의 처리 및 보유기간)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-[#64748B] leading-relaxed">
                1. 테니스프렌즈는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <p className="text-[#64748B] leading-relaxed">
                2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#64748B] mt-4">
                <li>서비스 이용 기록: 1년</li>
                <li>고객 문의 기록: 3년</li>
                <li>통계 분석용 데이터: 익명화 처리 후 5년</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제3조 (처리하는 개인정보의 항목)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-[#64748B] leading-relaxed">
                테니스프렌즈는 다음의 개인정보 항목을 처리하고 있습니다:
              </p>
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">필수항목</h4>
                <ul className="list-disc list-inside space-y-1 text-[#64748B]">
                  <li>서비스 이용 기록 (IP 주소, 접속 시간, 이용한 서비스)</li>
                  <li>테스트 결과 데이터 (익명화 처리)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">선택항목</h4>
                <ul className="list-disc list-inside space-y-1 text-[#64748B]">
                  <li>고객 문의 시 제공하는 연락처 정보</li>
                  <li>서비스 개선을 위한 피드백 내용</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제4조 (개인정보의 제3자 제공)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#64748B] leading-relaxed">
              테니스프렌즈는 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제5조 (개인정보처리의 위탁)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#64748B] leading-relaxed">
              테니스프렌즈는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
            </p>
            <div className="mt-4">
              <h4 className="font-semibold text-[#0F172A] mb-2">위탁받는 자 (수탁자)</h4>
              <ul className="list-disc list-inside space-y-1 text-[#64748B]">
                <li>Vercel Inc. (웹 호스팅 서비스)</li>
                <li>Supabase Inc. (데이터베이스 서비스)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제6조 (정보주체의 권리·의무 및 행사방법)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-[#64748B] leading-relaxed">
                1. 정보주체는 테니스프렌즈에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
              </p>
              <ul className="list-disc list-inside space-y-1 text-[#64748B]">
                <li>개인정보 처리현황 통지요구</li>
                <li>개인정보 열람요구</li>
                <li>개인정보 정정·삭제요구</li>
                <li>개인정보 처리정지요구</li>
              </ul>
              <p className="text-[#64748B] leading-relaxed">
                2. 제1항에 따른 권리 행사는 테니스프렌즈에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 테니스프렌즈는 이에 대해 지체없이 조치하겠습니다.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제7조 (개인정보의 안전성 확보조치)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#64748B] leading-relaxed">
              테니스프렌즈는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#64748B] mt-4">
              <li>개인정보 취급 직원의 최소화 및 교육</li>
              <li>개인정보에 대한 접근 제한</li>
              <li>개인정보의 암호화</li>
              <li>해킹 등에 대비한 기술적 대책</li>
              <li>개인정보처리시스템 등의 접근권한 관리</li>
              <li>개인정보의 정기적 백업 및 복구</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제8조 (개인정보보호책임자)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-[#64748B] leading-relaxed">
                테니스프렌즈는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-[#0F172A] mb-2">개인정보보호책임자</h4>
                <p className="text-[#64748B]">이메일: privacy@tennisfriends.kr</p>
                <p className="text-[#64748B]">문의사항이 있으시면 언제든지 연락해 주시기 바랍니다.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>제9조 (개인정보처리방침의 변경)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#64748B] leading-relaxed">
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#64748B]">
            본 개인정보처리방침은 2024년 1월 1일부터 시행됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
